'use strict';

function BoardResizeSystem() {
	SystemBase.call(this);
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this._resizeCallback = null;
	this._bindResizeEvent();
}

BoardResizeSystem.prototype = Object.create(SystemBase.prototype);
BoardResizeSystem.prototype.constructor = BoardResizeSystem;

BoardResizeSystem.prototype._bindResizeEvent = function() {
	var _this = this;
	this._resizeCallbackFunc = function() {
		_this.width = Math.max(window.innerWidth, 600);
		_this.height = Math.max(window.innerHeight, 600);
	};
	window.addEventListener('resize', this._resizeCallback);
}

BoardResizeSystem.prototype.destroy = function() {
	if (this._resizeCallback) {
		window.removeEventListener('resize', this._resizeCallback);
	}
}

BoardResizeSystem.prototype._updateEntity = function(entity, dt) {
	if (!entity.components.board) {
		return;
	}
	entity.components.board.width = this.width;
	entity.components.board.height = this.height;
}