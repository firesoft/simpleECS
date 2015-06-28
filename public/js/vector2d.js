'use strict';

function Vector2d(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector2d.prototype.copy = function() {
	return new Vector2d(this.x, this.y);
}

Vector2d.prototype.zero = function() {
	this.x = 0;
	this.y = 0;
	return this;
}

Vector2d.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector2d.prototype.normalize = function() {
	var length = this.length();
	if (!length) {
		return this.zero();
	} 
	return this.multiply(1/length);
}

Vector2d.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
	return this;
}

Vector2d.prototype.sub = function(vector) {
	this.x -= vector.x;
	this.y -= vector.y;
	return this;
}

Vector2d.prototype.dot = function(vector) {
	return (this.x * vector.x + this.y * vector.y);
}

Vector2d.prototype.cross = function(vector) {
	return (this.x * vector.y - this.y * vector.x);
}

Vector2d.prototype.multiply = function(coeff) {
	this.x *= coeff;
	this.y *= coeff;
	return this;
}

Vector2d.prototype.angle = function(vector) {
	return Math.atan2(this.cross(v2), this.dot(v2)) * -180 / Math.PI
}

Vector2d.prototype.multiplyXY = function(coeffX, coeffY) {
	this.x *= coeffX;
	this.y *= coeffY;
	return this;
}
