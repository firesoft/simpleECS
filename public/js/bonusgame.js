'use strict';

function BonusGame(params) {
	this._params = params;
	this._timer = null;
	this._entities = [];
	this._systems = [];
	this._requestAnimationFrameHandle = null;
	this._bonusFactory = null;
	this._entityFactory = new EntityFactory();
	this._initBonusFactory();
}

BonusGame.prototype.start = function() {
	this._initTimer();
	this._initSystems();
	this._initEntities();
	this._run();
}

BonusGame.prototype.stop = function() {
	this._cancelAnimationFrame();
	this._destroySystems();
}

BonusGame.prototype._cancelAnimationFrame = function() {
	if (this._requestAnimationFrameHandle) {
		window.cancelAnimFrame(this._requestAnimationFrameHandle);
		this._requestAnimationFrameHandle = null;	
	}
}

BonusGame.prototype._initTimer = function() {
	this._timer = new Timer();
}

BonusGame.prototype._initEntities = function() {
	this._entityFactory.resetEntitiesCollection();

	var boardEntity = this._entityFactory.create('board');
	boardEntity.addComponent(new CollidableComponent());
	boardEntity.addComponent(new BoardComponent());

	var bonusEntity = this._entityFactory.create('bonus');
	bonusEntity.components.physics.position.x = 100;
	bonusEntity.components.physics.position.y = 100;

	// var bonusEntity = this._entityFactory.create('bonus');
	// bonusEntity.components.physics.position.x = 400;
	// bonusEntity.components.physics.position.y = 400;
}

BonusGame.prototype._run = function() {
	var _this = this;
	var dt = this._timer.update();
	this._runSystems(dt);
	this._requestAnimationFrameHandle = window.requestAnimFrame(function() {
		_this._run();
	});
}

BonusGame.prototype._initSystems = function() {
	this._systems = [
		new InputSystem(this._entityFactory),
		new BoardResizeSystem(this._entityFactory),
		new PhysicsSystem(this._entityFactory),
		new CollisionSystem(this._entityFactory),
		new BlinkingSystem(this._entityFactory),
		new BonusSpawnSystem(this._entityFactory),
		new RenderSystem(this._entityFactory)
	];
}

BonusGame.prototype._runSystems = function(dt) {
	if (!dt) {
		return;
	}
	for (var i = 0; i < this._systems.length; i++) {
		this._systems[i].run(this._entityFactory.getEntities(), dt);
	}
}

BonusGame.prototype._destroySystems = function() {
	for (var i = 0; i < this._systems.length; i++) {
		if (this._systems[i].destroy) {
			this._systems[i].destroy();
		}
	}
}

BonusGame.prototype._initBonusFactory = function() {
	var bonusFactory = new BonusFactory({
		img: this._params.bonusImage,
		click: this._params.bonusClick
	});
	this._entityFactory.registerFactory('bonus', bonusFactory);
}