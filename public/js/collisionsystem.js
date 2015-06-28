'use strict';

function CollisionSystem() {

}

CollisionSystem.prototype.run = function(entities, time) {
	var length = entities.length;
	for (var i = 0; i < length; i++) {
		var entityA = entities[i];
		if (!entityA.components.collidable) {
			continue;
		}
		for (var j = i + 1; j < length; j++) {
			var entityB = entities[j];
			if (!entityB.components.collidable) {
				continue;
			}
			this._checkForCollision(entityA, entityB);
		}
	}
}



CollisionSystem.prototype._checkForCollision = function(entityA, entityB) {
	if (entityA.components.board && entityB.components.board) {
		return false;
	}
	if (entityA.components.board || entityB.components.board) {
		if (entityA.components.board) {
			return this._checkForCollisionAABBvsBoard(entityB, entityA);
		}
		return this._checkForCollisionAABBvsBoard(entityA, entityB);
	}
	return this._checkForCollisionAABBvsAABB(entityA, entityB);
}

CollisionSystem.prototype._checkForCollisionAABBvsBoard = function(entityAABB, entityBoard) {
	var coord = this._getAABBCoordinates(entityAABB);

	var collision = false;

	if (coord.x1 < 0) {
		entityAABB.components.physics.position.x = entityAABB.components.render.width/2;
		entityAABB.components.physics.velocity.x = Math.abs(entityAABB.components.physics.velocity.x);
		collision = true;
	}

	if (coord.y1 < 0) {
		entityAABB.components.physics.position.y = entityAABB.components.render.height/2;
		entityAABB.components.physics.velocity.y = Math.abs(entityAABB.components.physics.velocity.y);
		collision = true;
	}

	if (coord.x2 > entityBoard.components.board.width) {
		entityAABB.components.physics.position.x = entityBoard.components.board.width - entityAABB.components.render.width/2;
		entityAABB.components.physics.velocity.x = -1 * Math.abs(entityAABB.components.physics.velocity.x);
		collision = true;
	}

	if (coord.y2 > entityBoard.components.board.height) {
		entityAABB.components.physics.position.y = entityBoard.components.board.height - entityAABB.components.render.height/2;
		entityAABB.components.physics.velocity.y = -1 * Math.abs(entityAABB.components.physics.velocity.y);
		collision = true;
		
	}

	if (collision) {
		entityAABB.addComponent(new BlinkingComponent());
	} 
}

CollisionSystem.prototype._checkForCollisionAABBvsAABB = function(entityA, entityB) {
	var coordA = this._getAABBCoordinates(entityA);
	var coordB = this._getAABBCoordinates(entityB);

	if (!(coordA.x1 < coordB.x2 && coordA.x2 > coordB.x1 && coordA.y1 < coordB.y2 && coordA.y2 > coordB.y1)) {
		return;
	}
	var forceA = entityB.components.physics.position.copy().multiply(-1).add(entityA.components.physics.position).normalize().multiply(10000);
	var forceB = entityA.components.physics.position.copy().multiply(-1).add(entityB.components.physics.position).normalize().multiply(10000);
	entityA.components.physics.force.add(forceA);
	entityB.components.physics.force.add(forceB);


	entityA.components.physics.torque -= sign(entityB.components.physics.angularVelocity) * 8000;
	entityB.components.physics.torque -= sign(entityA.components.physics.angularVelocity) * 8000;



	entityA.addComponent(new BlinkingComponent());
	entityB.addComponent(new BlinkingComponent());
}

CollisionSystem.prototype._getAABBCoordinates = function(entity) {
	var halfWidth = entity.components.render.width/2;
	var x1 = entity.components.physics.position.x - halfWidth;
	var x2 = entity.components.physics.position.x + halfWidth;

	var halfHeight = entity.components.render.height/2;
	var y1 = entity.components.physics.position.y - halfHeight;
	var y2 = entity.components.physics.position.y + halfHeight;

	return {x1: x1, y1: y1, x2: x2, y2: y2};
}