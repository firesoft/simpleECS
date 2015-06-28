'use strict';

function BonusSpawnSystem(entityFactory) {
	SystemBase.call(this, entityFactory);
	this._spawnTimer = 0;
	this._spawnTime = 2;
	this._spawnsLeft = 4;
}

BonusSpawnSystem.prototype = Object.create(SystemBase.prototype);
BonusSpawnSystem.prototype.constructor = BonusSpawnSystem;

BonusSpawnSystem.prototype.run = function(entities, dt) {
	this._spawnTimer += dt;
	if (this._spawnTimer < this._spawnTime || !this._spawnsLeft) {
		return;
	}
	this._spawnTimer = 0;
	this._spawnsLeft--;
	SystemBase.prototype.run.call(this, entities, dt);
}

BonusSpawnSystem.prototype._updateEntity = function(entity, dt) {
	if (entity.name != 'bonus') {
		return;
	}
	var newBonus = this._entityFactory.create('bonus');
	newBonus.components.physics.position.x = entity.components.physics.position.x;
	newBonus.components.physics.position.y = entity.components.physics.position.y;
}
