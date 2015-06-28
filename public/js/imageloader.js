'use strict';

function ImageLoader() {
}

ImageLoader.prototype.load = function(path, callback) {
	var img = new Image();
	img.addEventListener('load', function() {
		callback(img);
	});
	img.src = path;
}