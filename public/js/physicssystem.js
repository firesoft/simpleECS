'use strict';

function PhysicsSystem() {
	SystemBase.call(this);
	this.frictionCoeff = 0.5;
	this.momentOfInertia = 1;
}

PhysicsSystem.prototype = Object.create(SystemBase.prototype);
PhysicsSystem.prototype.constructor = PhysicsSystem;

PhysicsSystem.prototype._updateEntity = function(entity, dt) {
	if (entity.components.physics) {
		this._updatePhysicsComponent(entity.components.physics, dt);
	}
}

PhysicsSystem.prototype._updatePhysicsComponent = function(physicsComponent, dt) {
	this._updateEntityPosition(physicsComponent, dt);
	this._updateEntityRotation(physicsComponent, dt);
	this._applyFriction(physicsComponent, dt);
}

PhysicsSystem.prototype._updateEntityPosition = function(physicsComponent, dt) {
	var acceleration = physicsComponent.force.copy().multiply(1 / physicsComponent.mass);
	physicsComponent.velocity.add(acceleration.multiply(dt));
	physicsComponent.position.add(physicsComponent.velocity.copy().multiply(dt));
	physicsComponent.force.zero();
}

PhysicsSystem.prototype._updateEntityRotation = function(physicsComponent, dt) {
	physicsComponent.angularVelocity += physicsComponent.torque * (1 / this.momentOfInertia) * dt
	physicsComponent.rotation += physicsComponent.angularVelocity * dt

	//physicsComponent.rotation += 90 * dt;
	if (physicsComponent.rotation > 360) {
		physicsComponent.rotation -= Math.floor(physicsComponent.rotation / 360) * 360;
	}
	physicsComponent.torque = 0;
}

PhysicsSystem.prototype._applyFriction = function(physicsComponent, dt) {
	physicsComponent.velocity.add(physicsComponent.velocity.copy().multiply(-1).multiply(dt * this.frictionCoeff));
	physicsComponent.angularVelocity += physicsComponent.angularVelocity * -1 * dt * this.frictionCoeff;
	this._checkVelocity(physicsComponent);
	this._checkAngularVelocity(physicsComponent);

}

PhysicsSystem.prototype._checkVelocity = function(physicsComponent) {
	var velocity = physicsComponent.velocity;
	var speed = velocity.length();
	if (speed < 1) {
		velocity.zero();
	}
	if (speed > 1000) {
		velocity.normalize().multiply(1000);
	}
}

PhysicsSystem.prototype._checkAngularVelocity = function(physicsComponent) {
	if (Math.abs(physicsComponent.angularVelocity) < 1) {
		physicsComponent.angularVelocity = 0;
	}
	if (physicsComponent.angularVelocity > 500) {
		physicsComponent.angularVelocity = 500;
	}
	if (physicsComponent.angularVelocity < -500) {
		physicsComponent.angularVelocity = -500;
	}
}