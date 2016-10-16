var showRules = function () {
  chrome.storage.sync.get(null, function (items) {
    var rules = document.getElementById("rules");
    if (items["enabled"]) {
      var colors = [];
      for (var key in items) {
        if (key !== "enabled" && key !== "ColorBlindness") {
          colors.push([parseRGB(key), parseRGB(items[key])]);
        }
      }
      rules.innerHTML = "<br>";
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
    else {
      rules.innerHTML = "Extension disabled.<br>Right-click to toggle.<br>";
    }
  });
};

$(document).ready(showRules);
