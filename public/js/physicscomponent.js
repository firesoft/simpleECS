'use strict';

function PhysicsComponent() {
	ComponentBase.call(this, 'physics');

	this.position = new Vector2d(0, 0);
	this.velocity = new Vector2d(0, 0);
	this.force = new Vector2d(0, 0);
	this.mass = 1;
	
	this.rotation = 0;
	this.angularVelocity = 0;
	this.torque = 0;
}


PhysicsComponent.prototype = Object.create(ComponentBase.prototype);
PhysicsComponent.prototype.constructor = PhysicsComponent;