'use strict';

/////////////////

function Entity(id, name) {
	this.id = id;
	this.name = name || 'unknown';
	this.components = {};
}

Entity.prototype.addComponent = function(component) {
	if (this.components[component.name]) {
		return;
	}
	this.components[component.name] = component;
}

Entity.prototype.removeComponent = function(componentName) {
	delete this.components[componentName];
}

/////////////////

function ComponentBase(name) {
	this.name = name;
}

/////////////////

function SystemBase(entityFactory) {
	this._entityFactory = entityFactory;
}

SystemBase.prototype.run = function(entities, dt) {
	this.beforeRun();
	var entitiesCount = entities.length;
	for (var i = 0; i < entitiesCount; i++) {
		var entity = entities[i];
		this._updateEntity(entity, dt);
	}
	this.afterRun();
}

SystemBase.prototype.beforeRun = function() {

}

SystemBase.prototype.afterRun = function() {
	
}

SystemBase.prototype.destroy = function() {

}

SystemBase.prototype._updateEntity = function(entity, dt) {

}

function sign(value) {
	if (value == 0) {
		return 0;
	}
	if (value > 0) {
		return 1;
	}
	return -1;
}