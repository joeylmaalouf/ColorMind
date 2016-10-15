//todo: instead of storing results of options, analyze results and store that
var diagnose_func = function () {
  $( "#diagnose" ).submit(function( event ) {
    event.preventDefault();

    var a = $('input[name=color1]:checked', '#diagnose').val();
    var b = $('input[name=color2]:checked', '#diagnose').val();
    var c = $('input[name=color3]:checked', '#diagnose').val();
    var d = $('input[name=color4]:checked', '#diagnose').val();
    var e = $('input[name=color5]:checked', '#diagnose').val();
    var f = $('input[name=color6]:checked', '#diagnose').val();
    res = [a,b,c,d,e,f]

    for (i = 0; i < res.length; i++) {
      if (res[i] == "Distinct") {
        res[i] = false
      } else {
        res[i] = true
      }
    }




    chrome.storage.sync.set({
      dGreen_Red: res[0],
      dYellow_Blue: res[1],
      lRed_Green: res[2],
      Magenta_dCyan: res[3],
      Red_Green: res[4],
      Yellow_Blue: res[5]
  }, function() {
      // Send alert to user to verify saving.
      // alert("Saved");
      alert(res);

  });


  });
};
$(document).ready(function() {
  diagnose_func()
});

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
  }, function(items) {
    $('input[name=color1]:checked', '#diagnose').val(items.dGreen_Red);
    $('input[name=color2]:checked', '#diagnose').val(items.dYellow_Blue);
    $('input[name=color3]:checked', '#diagnose').val(items.lRed_Green);
    $('input[name=color4]:checked', '#diagnose').val(items.Magenta_dCyan);
    $('input[name=color5]:checked', '#diagnose').val(items.Red_Green);
    $('input[name=color6]:checked', '#diagnose').val(items.Yellow_Blue);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
