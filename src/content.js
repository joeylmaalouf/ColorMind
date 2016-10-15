var colormind = {
	init: function() {
		$("*").each(function(i, e) {
			console.log($(e).css('color'));
		});
	}
}

colormind.init()