define("colormind", [], function() {
	exports.init = function() {
		console.log("initted");
	};
});

foo = require("colormind");
foo.init();