var blindMap = {
  "red/dark_green": {
    "red": "red",
    "dark_green": "blue"
  },
  "blue/yellow": {
    "blue": "blue",
    "yellow": "green"
  },
  "light_red/green": {
    "light_red": "red",
    "green": "blue"
  },
  "magenta/dark_cyan": {
    "magenta" : "magenta",
    "dark_cyan": "gray"
  },
  "red/green": {
    "red": "red",
    "green": "blue"
  },
  "yellow/blue": {
    "yellow": "green",
    "blue": "blue"
  }
};

var diagnose = function (e) {
  e.preventDefault();
  var a = $("input[name=color1]:checked", "#diagnose").val() === "Indistinct";
  var b = $("input[name=color2]:checked", "#diagnose").val() === "Indistinct";
  var c = $("input[name=color3]:checked", "#diagnose").val() === "Indistinct";
  var d = $("input[name=color4]:checked", "#diagnose").val() === "Indistinct";
  var e = $("input[name=color5]:checked", "#diagnose").val() === "Indistinct";
  var f = $("input[name=color6]:checked", "#diagnose").val() === "Indistinct";
  var blindness = {
    "red/dark_green": a,
    "blue/yellow": b,
    "light_red/green": c,
    "magenta/dark_cyan": d,
    "red/green": e,
    "yellow/blue": f
  }; 
  chrome.storage.sync.set({
    "ColorBlindness": blindness
  });
};

var display = function () {
  chrome.storage.sync.get("ColorBlindness", function (items) {
    var header = document.getElementById("resHeader");
    var results = document.getElementById("results");
    header.innerHTML = "Results";
    var cb = items["ColorBlindness"];
    results.innerHTML = "You have the following types of color blindness:<br>";
    var perfect = true;
    var changes = {};
    for (var type in cb) {
      if (cb[type]) {
        results.innerHTML += type + "<br>";
        perfect = false;
        var mapping = blindMap[type];
        for (var col in mapping) {
          changes[col] = mapping[col];
        }
      }
    }
    if (perfect) {
      results.innerHTML += "None!";
    }
    else {
      results.innerHTML += "<br>So we recommend the following changes:";
    }
    results.innerHTML += "<br>";
    for (var key in changes) {
      var val = changes[key];
      results.innerHTML += "<input size=\"7\" class=\"color\" value=\"" + RGB2HEX(colorSamples[key]) + "\">";
      results.innerHTML += " &rarr; ";
      results.innerHTML += "<input size=\"7\" class=\"color\" value=\"" + RGB2HEX(colorSamples[val]) + "\">";
      results.innerHTML += " <br> <br>";
    }
    $(".color").spectrum({
      disabled: true
    });
  });
};

var update = function () {
  chrome.storage.sync.get(null, function (items) {
    var tmp = [];
    var changes = {};
    $(".color").each(function (index, element) {
      tmp.push(element.value);
    });
    for (var i = 0; i < tmp.length; i += 2) {
      changes[tmp[i]] = tmp[i+1];
    };
    for (var key in changes) {
      var params = {};
      params[parseHEX(key)] = parseHEX(changes[key]);
      chrome.storage.sync.set(params);
    }
    for (var key in items) {
      if (key !== "enabled" && key !== "ColorBlindness") {
        var color = parseRGB(clampCategory(key));
        if (color in changes) {
          var params = {};
          params[key] = clampCategory(parseHEX(changes[color]));
          chrome.storage.sync.set(params);
        }
      }
    }
  });
};

$(document).ready(function() {
  $("#update").hide();
  $("#diagnose").submit(function (e) {
    diagnose(e);
    display();
    $("#update").show();
  });
  $("#update").click(function (e) {
    update();
  });
});
