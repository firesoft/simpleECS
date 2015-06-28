'use strict';

function EntityFactory() {
	this._id = 0;
	this._entityFactories = {};

	this._entities = [];
}

EntityFactory.prototype.create = function(type) {
	this._id++;
	var entity = new Entity(this._id, type);
	this._prepareEntity(type, entity)
	this._entities.push(entity);
	return entity;
}

EntityFactory.prototype.getEntities = function() {
	return this._entities;
}

EntityFactory.prototype.resetEntitiesCollection = function() {
	this._entities = [];
}

EntityFactory.prototype.registerFactory = function(type, factory) {
	this._entityFactories[type] = factory;
}

EntityFactory.prototype._prepareEntity = function(type, entity) {
	if (this._entityFactories.hasOwnProperty(type)) {
		this._entityFactories[type].create(entity);
	}
	return entity;
}