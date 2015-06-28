'use strict';

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
    function(callback) {
        return window.setTimeout(function() {
            callback();
        }, 1000/60);
    };
})();

window.cancelAnimFrame = (function() {
	return window.cancelAnimationFrame ||
	clearTimeout;
})();
