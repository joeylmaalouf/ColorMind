var blindMap = {
  "red/dark_green": {
    "red": "red",
    "green": "blue"
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

var diagnose_func = function (e) {
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
}

function options_func() {
  chrome.storage.sync.get("ColorBlindness", function (items) {
    var results = document.getElementById("results");
    var header = document.getElementById("resHeader");
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
      results.innerHTML += "None!"
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
}

$(document).ready(function() {
  $("#diagnose").submit(function (e) {
    diagnose_func(e);
    options_func();
  });
});
