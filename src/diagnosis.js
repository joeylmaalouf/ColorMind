console.log("blarg");
var diagnose_func = function () {
  console.log("trying");
  $( "#diagnose" ).submit(function( event ) {
    event.preventDefault();
    alert( "Handler for .submit() called." );
    
  });
};
$(document).ready(function() {
  diagnose_func()
});

