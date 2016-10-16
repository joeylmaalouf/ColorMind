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

var showRules = function () {
  chrome.storage.sync.get(null, function (items) {
    if (items["enabled"]) {
      var colors = [];
      for (var key in items) {
        if (key !== "enabled" && key !== "ColorBlindness") {
          colors.push([parseRGB(key), parseRGB(items[key])]);
        }
      }
      var rules = document.getElementById("rules");
      var count = 0;
      for (var i in colors) {
        var values = colors[i];
        rules.innerHTML += "<input size=\"7\" id=\"cpi" + count + "\" value=\"" + values[0] + "\">";
        rules.innerHTML += " &rarr; ";
        rules.innerHTML += "<input size=\"7\" id=\"cpo" + count + "\" value=\"" + values[1] + "\">";
        rules.innerHTML += " <br> <br>";
        ++count;
      }
      $("[id*=cpi]").spectrum({
        disabled: true
      });
      $("[id*=cpo]").spectrum({
        preferredFormat: "hex",
        change: function (color) {
          var ind = parseInt(this.id.substring(3, 4));
          var idi = "#cpi" + ind;
          var ido = "#cpo" + ind;
          color = color.toString().toUpperCase();
          $(ido).val(color);
          colors[ind][1] = color;
          var params = {};
          params[parseHEX($(idi).val())] = parseHEX(color);
          chrome.storage.sync.set(params);
        }
      });
    }
  });
};

$(document).ready(showRules);
