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
    rules.innerHTML += "<input size=\"7\" style=\"background:#" + key + "\" value=\"#" + key + "\">";
    rules.innerHTML += " &rarr; ";
    rules.innerHTML += "<input size=\"7\" style=\"background:#" + val + "\" value=\"#" + val + "\" id=\"cp" + count + "\" value=\"#" + val + "\">";
    rules.innerHTML += " <br>";
    $("#cp" + count).spectrum({
      color: "#" + val,
      change: function (color) {
        alert(color.toHexString());
      }
    });
    ++count;
  }
  console.log($("[id*=cp]"));
};

$(document).ready(showRules);
