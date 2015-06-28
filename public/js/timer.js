'use strict';

function Timer() {
	this.currentTime = new Date().getTime();
	this.delta = 0;
}

Timer.prototype.update = function() {
	var time = new Date().getTime();
	this.delta = time - this.currentTime;
	this.currentTime = time;

	return this.delta / 1000;
}