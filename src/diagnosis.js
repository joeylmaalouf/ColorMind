console.log("blarg");
var diagnose_func = function () {
  console.log("trying");
  $( "#diagnose" ).submit(function( event ) {
    event.preventDefault();
    
    var a = $('input[name=color1]:checked', '#diagnose').val();
    var b = $('input[name=color2]:checked', '#diagnose').val();
    var c = $('input[name=color3]:checked', '#diagnose').val();
    var res = [a,b,c];
    alert(res);
    
  });
};
$(document).ready(function() {
  diagnose_func()
});

