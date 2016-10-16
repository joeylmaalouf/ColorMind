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
