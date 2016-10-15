var diagnose_func = function () {
  $( "#diagnose" ).submit(function( event ) {
    event.preventDefault();

    var a = $('input[name=color1]:checked', '#diagnose').val();
    var b = $('input[name=color2]:checked', '#diagnose').val();
    var c = $('input[name=color3]:checked', '#diagnose').val();
    var d = $('input[name=color4]:checked', '#diagnose').val();
    var e = $('input[name=color5]:checked', '#diagnose').val();
    var f = $('input[name=color6]:checked', '#diagnose').val();
    
    
    chrome.storage.sync.set({
      Color1: a,
      Color2: b,
      Color3: c,
      Color4: d,
      Color5: e,
      Color6: f
  }, function() {
      // Send alert to user to verify saving.
      alert("Saved");
  });


  });
};
$(document).ready(function() {
  diagnose_func()
});

// // Saves options to chrome.storage
// function save_options() {
//   var color = document.getElementById('color').value;
//   var likesColor = document.getElementById('like').checked;
//   chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function() {
//       status.textContent = '';
//     }, 750);
//   });
// }

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    // favoriteColor: 'red',
    // likesColor: true
    Color1: 'Distinct',
    Color2: 'Distinct',
    Color3: 'Distinct',
    Color4: 'Distinct',
    Color5: 'Distinct',
    Color6: 'Distinct'

  }, function(items) {
    // document.getElementById('color').value = items.favoriteColor;
    // document.getElementById('like').checked = items.likesColor;
    $('input[name=color1]:checked', '#diagnose').val(items.Color1);
    $('input[name=color2]:checked', '#diagnose').val(items.Color2);
    $('input[name=color3]:checked', '#diagnose').val(items.Color3);
    $('input[name=color4]:checked', '#diagnose').val(items.Color4);
    $('input[name=color5]:checked', '#diagnose').val(items.Color5);
    $('input[name=color6]:checked', '#diagnose').val(items.Color6);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',
//     save_options);