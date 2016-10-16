function applyStyles(){};

(function() {
	var COLOR_MARGIN_UNIQUENESS = 40;
	var colors = [];
	var counter = 0;

	function init() {
		chrome.storage.sync.get("enabled", function(item) {
			if ($.isEmptyObject(item) || item.enabled) {
				console.log("ColorMind enabled");
				chrome.storage.sync.set({enabled: false});

				chrome.storage.onChanged.addListener(function (changes, namespace) {
					console.log(counter);
					if (counter == 0) {
						applyStyles();
					}
				});

				$("<style id='colormind-styles' type='text/css'></style>").appendTo("head");
				$("*").each(function(i, e) {
					color = $(e).css('color').match(/\d+/g)
					background_color = $(e).css('background-color').match(/\d+/g)
					$(e).addClass('colormind_background_' + colors.indexOf(makeUnique(background_color)))
					$(e).addClass('colormind_' + colors.indexOf(makeUnique(color)))
				});
				counter = colors.length;
				console.log(colors.length + " unique colors identified.")

				applyStyles = function() {
					$("#colormind-styles").text("");
					$.each(colors, function(n, color) {
				        for (var i = 0; i < color.length; ++i) {
				        	color[i] = parseInt(color[i]);
				        };
						getColor(color, n);
					});
				}

				applyStyles();
			} else {
				console.log("ColorMind disabled");
			}
		});
	}

	function addClass(color, n) {
		$("#colormind-styles").text(
			$("#colormind-styles").text() + ".colormind_" + n + "{color: " + color + " !important;}" 
				+ ".colormind_" + n + "::-webkit-input-placeholder {color: " + color + " !important;}"
				+ ".colormind_background_" + n + "{background-color: " + color + " !important;}"
		);
	}

	// Either get the similar color if the given color is not unique enough, or return the color if it unique
	function makeUnique(rgb) {
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];

		matchedColor = colors.find(function(c) {
			return (Math.abs(c[0] - r) < COLOR_MARGIN_UNIQUENESS && 
					Math.abs(c[1] - g) < COLOR_MARGIN_UNIQUENESS &&
					Math.abs(c[2] - b) < COLOR_MARGIN_UNIQUENESS)
		});

		if (matchedColor == undefined) {
			colors.push(rgb);
			return rgb;
		} else {
			return matchedColor;
		}
	}

	// Get corrected color for given color
	function getColor(color, n) {
		chrome.storage.sync.get(JSON.stringify(color), function(correctColor) {
			if ($.isEmptyObject(correctColor)) {
        		correctColor = JSON.stringify(color);
				if (counter > 0) {	
					--counter;
					console.log("new counter", counter)
					var params = {};
					params[correctColor] = correctColor;
					chrome.storage.sync.set(params);
				}
			} else if (counter != 0) {
				counter = 0;
			}

			c_string = correctColor[JSON.stringify(color)];
			c_string = c_string.substring(1, c_string.length -1);
			if (color.length == 4) {
				addClass("rgba(" + c_string + ")", n);
			} else {
				addClass("rgb(" + c_string + ")", n);
			}
		});
	}

	$(document).ready(function() {
		init();
	});
})();
