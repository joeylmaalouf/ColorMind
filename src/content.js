// Maps from unique colors to modified ones for colorblind ppl
var colorMap = {};
colorMap['255,255,255'] = '200,50,50';

function applyStyles(){};

(function() {
	var COLOR_MARGIN_UNIQUENESS = 5;
	var colors = [];

	function init() {
		$("<style id='colormind-styles' type='text/css'></style>").appendTo("head");
		$("*").each(function(i, e) {
			color = $(e).css('color').match(/\d+/g)
			$(e).addClass('colormind_' + colors.indexOf(makeUnique(color)))
			// if (sum = color.reduce((pv, cv) => pv+cv, 0) != 0) {
			// }
		});
		console.log(colors.length + " unique colors identified.")

		applyStyles = function() {
			$("#colormind-styles").text("");
			$.each(colors, function(n, color) {
				$("#colormind-styles").text(
					$("#colormind-styles").text() + ".colormind_" + n + "{color: " + getColor(color) + " !important;}" 
						+ ".colormind_" + n + "::-webkit-input-placeholder {color: " + getColor(color) + " !important;}"
				);
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
	function getColor(color) {
		c = colorMap[color.toString()];
		if (c == undefined) {
			c = '50,50,200'
			colorMap[color.toString] = c;
		}
		c = c.split(',');
		return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
	}

	$(document).ready(function() {
		init();
	});
})();
