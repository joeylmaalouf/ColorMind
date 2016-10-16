var diagnose_func = function (e) {
  e.preventDefault();
  var a = $("input[name=color1]:checked", "#diagnose").val() === "Indistinct";
  var b = $("input[name=color2]:checked", "#diagnose").val() === "Indistinct";
  var c = $("input[name=color3]:checked", "#diagnose").val() === "Indistinct";
  var d = $("input[name=color4]:checked", "#diagnose").val() === "Indistinct";
  var e = $("input[name=color5]:checked", "#diagnose").val() === "Indistinct";
  var f = $("input[name=color6]:checked", "#diagnose").val() === "Indistinct";
  var blindness = {
    "red/darkGreen": a,
    "blue/yellow": b,
    "lightRed/green": c,
    "magenta/darkCyan": d,
    "red/green": e,
    "yellow/blue": f
  }; 
  chrome.storage.sync.set({
    "ColorBlindness": blindness
  });
}

function options_func() {
  chrome.storage.sync.get(null, function (items) {
    var results = document.getElementById("results");
    var header = document.getElementById("resHeader");
    header.innerHTML = "Results";
    var cb = items["ColorBlindness"];
    results.innerHTML = "You have the following types of color blindness:<br>";
    var perfect = true;
    console.log(cb);
    for (var key in cb) {
      if (cb[key]) {
        results.innerHTML += key + "<br>";
        perfect = false;
      }
    }
    if (perfect) {
      results.innerHTML += "None!<br>"
    }
    var colorMapping = {
      "red/darkGreen": {
        "red": "red",
        "green": "blue"
      },
      "blue/yellow": {
        "blue": "blue",
        "yellow": "green"
      },
      "lightRed/green": {
        "lightRed": "red",
        "green": "blue"
      },
      "magenta/darkCyan": {
        "magenta" : "magenta",
        "darkCyan": "gray"
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
    for (var key in items) {
      if (key !== "enabled" && key !== "ColorBlindness") {
        var val = items[key];
        // change val to recommended category based on colorblindness
        results.innerHTML += "<input size=\"7\" class=\"color\" value=\"" + parseRGB(key) + "\">";
        results.innerHTML += " &rarr; ";
        results.innerHTML += "<input size=\"7\" class=\"color\" value=\"" + parseRGB(val) + "\">";
        results.innerHTML += " <br> <br>";
      }
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
