var diagnose_func = function () {
  $("#diagnose").submit(function (event) {
    event.preventDefault();

    var a = $('input[name=color1]:checked', '#diagnose').val();
    var b = $('input[name=color2]:checked', '#diagnose').val();
    var c = $('input[name=color3]:checked', '#diagnose').val();
    var d = $('input[name=color4]:checked', '#diagnose').val();
    var e = $('input[name=color5]:checked', '#diagnose').val();
    var f = $('input[name=color6]:checked', '#diagnose').val();
    res = [a,b,c,d,e,f];

    for (i = 0; i < res.length; i++) {
      res[i] = !res[i] == "Distinct";
    }
    var blindness = {
      dGreen_Red: res[0],
      dYellow_Blue: res[1],
      lRed_Green: res[2],
      Magenta_dCyan: res[3],
      Red_Green: res[4],
      Yellow_Blue: res[5]
    }; 
    chrome.storage.sync.set({
      "ColorBlindness": blindness
    });
  });
};

function options_func() {
  chrome.storage.sync.get(null, function (items) {
    var results = document.getElementById('results');
    var header = document.getElementById('resHeader');
    header.textContent = 'Results';
    for (var i in items) {
      if (i !== "enabled" && i !== "ColorBlindness") {
        var values = items[i];
        results.textContent += "<input size=\"7\" value=\"" + values[0] + "\">";
        results.textContent += " &rarr; ";
        results.textContent += "<input size=\"7\" value=\"" + values[1] + "\">";
        results.textContent += " <br> <br>";
      }
    }

    // redDarkGreen colorblind = red--> red; green--> Blue
    // blueYellow colorbline = blue-->blue; yellow-->Green
    // lightRedGreen = lightRed--> red; green-->blue
    // magentaDarkCyan = magenta--> magenta; dark cyan--> gray
    // redGreen = red-->red; green-->blue
    // YellowBlue = yellow-->Green; blue-->blue
    var colorMapping = {
      "red_darkGreen": {
        "red": "red",
        "green": "blue"
      },
      "blue_yellow": {
        "blue": "blue",
        "yellow": "green"
      },
      "lightRed_green": {
        "lightRed": "red",
        "green": "blue"
      },
      "magenta_darkCyan": {
        "magenta" : "magenta",
        "darkCyan": "gray"
      },
      "red_green": {
        "red": "red",
        "green": "blue"
      },
      "yellow_blue": {
        "yellow": "green",
        "blue": "blue"
      }
    };
  });
}

$(document).ready(function() {
  diagnose_func();
  options_func();
});
