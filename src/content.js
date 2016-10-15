chrome.storage.onChanged.addListener(function(changes, namespace) {
	applyStyles();
});

function applyStyles(){};

(function() {
	var COLOR_MARGIN_UNIQUENESS = 5;
	var colors = [];

	function init() {
		$("<style id='colormind-styles' type='text/css'></style>").appendTo("head");
		$("*").each(function(i, e) {
			color = $(e).css('color').match(/\d+/g)
			background_color = $(e).css('background-color').match(/\d+/g)
			$(e).addClass('colormind_background_' + colors.indexOf(makeUnique(background_color)))
			$(e).addClass('colormind_' + colors.indexOf(makeUnique(color)))
		});
		console.log(colors.length + " unique colors identified.")

		applyStyles = function() {
			$("#colormind-styles").text("");
			$.each(colors, function(n, color) {
				getColor(color, n);
			});
		}

		applyStyles()
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
		r = rgb[0]
		g = rgb[1]
		b = rgb[2]

		matchedColor = colors.find(function(c) {
			return (Math.abs(c[0] - r) < COLOR_MARGIN_UNIQUENESS && 
					Math.abs(c[1] - g) < COLOR_MARGIN_UNIQUENESS &&
					Math.abs(c[2] - b) < COLOR_MARGIN_UNIQUENESS)
		});

		if (matchedColor == undefined) {
			colors.push(rgb)
			return rgb
		} else {
			return matchedColor;
		}
	}

	// Get corrected color for given color
	function getColor(color, n) {
		console.log(color)
		chrome.storage.sync.get(color.toString(), function(correctColor) {
			if ($.isEmptyObject(correctColor)) {
				if (color.length == 4) {
					correctColor = (parseInt(color[0]) + 50) + ',' 
						+ (parseInt(color[1]) + 50) + "," 
						+ (parseInt(color[2]) + 50) + "," 
						+ (parseInt(color[3]));
				} else {
					correctColor = (parseInt(color[0]) + 50) + ',' 
						+ (parseInt(color[1]) + 50) + "," 
						+ (parseInt(color[2]) + 50);
				}
			}
			console.log(correctColor)
			if (color.length == 4) {
				addClass("rgba(" + correctColor + ")", n);
			} else {
				addClass("rgb(" + correctColor + ")", n);
			}
		});
	}

	$(document).ready(function() {
		init();
	});
})();
