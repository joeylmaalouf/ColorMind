define("colormind", [], function() {
	return {
		init: function() {
			$("*").each(function(i, e) {
				console.log($(e).css("color"));
			});
		}
	}
});
