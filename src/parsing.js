var HEX2RGB = function (hex) {
  var rgb = [];
  hex = hex.substring(1);
  while (hex.length > 1) {
    rgb.push(parseInt(hex.substring(0, 2), 16));
    hex = hex.substring(2);
  }
  return rgb;
};

var RGB2HEX = function (rgb) {
  var hex = "";
  for (var c in rgb) {
    var h = rgb[c].toString(16);
    hex += h.length == 1 ? "0" + h : h;
  }
  return "#" + hex.toUpperCase();
};

var parseHEX = function (hex) {
  return JSON.stringify(HEX2RGB(hex));
};

var parseRGB = function (rgb) {
  return RGB2HEX(JSON.parse(rgb));
};

var colorSamples = {
  "white": [255, 255, 255],
  "black": [0, 0, 0],
  "gray": [128, 128, 128],
  "red": [255, 0, 0],
  "green": [0, 255, 0],
  "blue": [0, 0, 255],
  "yellow": [255, 255, 0],
  "magenta": [255, 0, 255],
  "cyan": [0, 255, 255]
};
for (var color in colorSamples) {
  if (color !== "white" && color !== "black" && color !== "gray") {
    var baseColor = colorSamples[color];
    colorSamples["dark_" + color] = [
      Math.max(0, baseColor[0] - 128),
      Math.max(0, baseColor[1] - 128),
      Math.max(0, baseColor[2] - 128)
    ];
    colorSamples["light_" + color] = [
      Math.min(255, baseColor[0] + 128),
      Math.min(255, baseColor[1] + 128),
      Math.min(255, baseColor[2] + 128)
    ];
  }
}

var clampCategory = function (rgb) {
  rgb = JSON.parse(rgb);
  for (var category in colorSamples) {
    var colorData = colorSamples[category];
    if ((Math.abs(rgb[0] - colorData[0]) <= 64) &&
        (Math.abs(rgb[1] - colorData[1]) <= 64) &&
        (Math.abs(rgb[2] - colorData[2]) <= 64)
    ) {
      return JSON.stringify(colorData);
    }
  }
  return null;
};
