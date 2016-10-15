var colors = {
  "ffffff": "000000",
  "0033dd": "aa1155",
  "123456": "abcdef"
};

var showRules = function () {
  var count = 0;
  var rules = document.getElementById("rules");
  for (var key in colors) {
    val = colors[key].toUpperCase();
    key = key.toUpperCase();
    rules.innerHTML += "<input size=\"7\" id=\"cpi" + count + "\" value=\"#" + key + "\">";
    rules.innerHTML += " &rarr; ";
    rules.innerHTML += "<input size=\"7\" id=\"cpo" + count + "\" value=\"#" + val + "\">";
    rules.innerHTML += " <br> <br>";
    ++count;
  }
  $("[id*=cpi]").spectrum({
    disabled: true
  });
  $("[id*=cpo]").spectrum({
    preferredFormat: "hex",
    change: function (color) {
      alert(color.toHexString());
    }
  });
};

$(document).ready(showRules);
