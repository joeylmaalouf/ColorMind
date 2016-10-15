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
    var blindness = {dGreen_Red: res[0], dYellow_Blue: res[1], lRed_Green: res[2], Magenta_dCyan: res[3], Red_Green: res[4], Yellow_Blue: res[5]}; 
    chrome.storage.sync.set({
      ColorBlindness: blindness
      // dGreen_Red: res[0],
      // dYellow_Blue: res[1],
      // lRed_Green: res[2],
      // Magenta_dCyan: res[3],
      // Red_Green: res[4],
      // Yellow_Blue: res[5]
  }, function() {
      // Send alert to user to verify saving.
      alert("Saved");
    });
  });
};
$(document).ready(function() {
  diagnose_func()
});

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.

// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   alert("restoring");
//   chrome.storage.sync.get({
//   }, function(items) {
//     res = [items.dGreen_Red,items.dYellow_Blue,items.lRed_Green,items.Magenta_dCyan,items.Red_Green,items.Yellow_Blue]
//     for (i = 0; i < res.length; i++) {
//       if (res[i] == false) {
//         res[i] = "Distinct"
//       } else {
//         res[i] = "Indistinct"
//       }
//     }
//     $('input[name=color1]', '#diagnose').val(res[0]);
//     $('input[name=color2]', '#diagnose').val(res[1]);
//     $('input[name=color3]', '#diagnose').val(res[2]);
//     $('input[name=color4]', '#diagnose').val(res[3]);
//     $('input[name=color5]', '#diagnose').val(res[4]);
//     $('input[name=color6]', '#diagnose').val(res[5]);
//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
