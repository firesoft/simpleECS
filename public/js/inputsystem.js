'use strict';

function InputSystem() {
	SystemBase.call(this);
	this._oldX = 0;
	this._oldY = 0;
	this._x = 0;
	this._y = 0;
	this._mouseMoveCallback = null;
	this._bindMouseMoveEvent();
}

InputSystem.prototype = Object.create(SystemBase.prototype);
InputSystem.prototype.constructor = InputSystem;

InputSystem.prototype._bindMouseMoveEvent = function() {
	var _this = this;

	this._mouseMoveCallback = function(event) {
		_this._x = event.clientX;
		_this._y = event.clientY;
	};
	window.addEventListener('mousemove', this._mouseMoveCallback);
}

InputSystem.prototype.destroy = function() {
	if (this._mouseMoveCallback) {
		window.removeEventListener('mousemove', this._mouseMoveCallback);
	}
}

InputSystem.prototype.afterRun = function() {
	this._oldX = this._x;
	this._oldY = this._y;
}

InputSystem.prototype._updateEntity = function(entity, dt) {
	if (!entity.components.physics) {
		return;
	}

	var dirVector = this._getDirectionVector(entity);
	//this._updateVisibiltyComponent(entity, dirVector);
	this._updatePhysicsComponent(entity, dirVector);
}

InputSystem.prototype._getDirectionVector = function(entity) {
	var physicsComponent = entity.components.physics;
	var dirVector = new Vector2d(this._x, this._y);
	dirVector.multiply(-1).add(physicsComponent.position);
	return dirVector;
}

InputSystem.prototype._updatePhysicsComponent = function(entity, dirVector) {
	var physicsComponent = entity.components.physics;

	var dirVectorLength = dirVector.length();
	var power = this._getPowerFromDirectionVectorLength(dirVectorLength);
	
	dirVector.normalize().multiply(power);
	physicsComponent.force.add(dirVector);


	var moveAngel = this._getMouseMoveAngel(physicsComponent);
	if (moveAngel) {
		physicsComponent.torque += -moveAngel/Math.abs(moveAngel) * this._getTourquePowerFromDirectionVectorLength(dirVectorLength);
	}
}

InputSystem.prototype._getMouseMoveAngel = function(physicsComponent) {
	var v1 = (new Vector2d(this._oldX, this._oldY)).sub(physicsComponent.position);
	var v2 = (new Vector2d(this._x, this._y)).sub(physicsComponent.position);

	return Math.atan2(v2.cross(v1), v2.dot(v1));
}

InputSystem.prototype._updateVisibiltyComponent = function(entity, dirVector) {
	if (!entity.components.visibility) {
		return;
	}
	var dirVectorLength = dirVector.length();
	if (dirVectorLength < 200) {
		entity.components.visibility.visibility = 1;
	} else if (dirVectorLength > 1000) {
		entity.components.visibility.visibility = 0;
	} else {
		entity.components.visibility.visibility = 1 - ((dirVectorLength - 200) / (1000 - 200));
	}
}

InputSystem.prototype._getPowerFromDirectionVectorLength = function(length) {
	if (Math.abs(length) < 10) {
		return 2000;
	}
	return Math.min(10000000 / (length*length), 2000);
}

InputSystem.prototype._getTourquePowerFromDirectionVectorLength = function(length) {
	if (Math.abs(length) < 100) {
		return 1000;
	}
	return Math.min(10000000 / (length*length), 1000);
}