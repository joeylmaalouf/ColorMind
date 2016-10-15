var colors = {
  "ffffff": "000000",
  "0033dd": "aa1155"
};

var makeButton = function (src, dst) {
  src = src.toUpperCase();
  dst = dst.toUpperCase();
  var str = "";
  str += "<button style=\"background:#" + src + "\">#" + src + "</button>";
  str += " &rarr; ";
  str += "<button class=\"jscolor {value:'" + dst + "'}\">#" + dst + "</button>";
  str += "<br>";
  return str;
};

var showRules = function () {
  var content = "";
  for (var key in colors) {
    val = colors[key];
    content += makeButton(key, val);
  }
  $("#rules").html(content);
};

$("document").ready(showRules);
