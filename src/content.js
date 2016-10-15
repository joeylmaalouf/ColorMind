chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		if (key == "colorMap") {
			applyStyles();
		}
	}
});

function applyStyles(){};

(function() {
	var COLOR_MARGIN_UNIQUENESS = 5;
	var colors = [];

	function init() {
		$("<style id='colormind-styles' type='text/css'></style>").appendTo("head");
		$("*").each(function(i, e) {
			color = $(e).css('color').match(/\d+/g)
			background_color = $(e).css('background').match(/\d+/g)
			$(e).addClass('colormind_background_' + colors.indexOf(makeUnique(background_color)))
			$(e).addClass('colormind_' + colors.indexOf(makeUnique(color)))
		});
		console.log(colors.length + " unique colors identified.")

		applyStyles = function() {
			chrome.storage.sync.get('colorMap', function(map) {
				if (map == undefined) {
					map = {};
				}
				$("#colormind-styles").text("");
				console.log(colors)
				$.each(colors, function(n, color) {
					$("#colormind-styles").text(
						$("#colormind-styles").text() + ".colormind_" + n + "{color: " + getColor(color, map) + " !important;}" 
							+ ".colormind_" + n + "::-webkit-input-placeholder {color: " + getColor(color, map) + " !important;}"
							+ ".colormind_background_" + n + "{background: " + getColor(color, map) + " !important;}"
					);
				});
				console.log(map)
				chrome.storage.sync.set({"colorMap": map});
			});
			
		}
		applyStyles()
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
	function getColor(color, map) {
		var c = "";
		if (map[color.toString()] == undefined) {
			c = (parseInt(color[0]) + 50) + ',' + (parseInt(color[1]) + 50) + "," + (parseInt(color[2]) + 50);
			map[color.toString()] = c;
		} else {
			c = map[color.toString()].split(',');
		}
		return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
	}

	$(document).ready(function() {
		init();
	});
})();
