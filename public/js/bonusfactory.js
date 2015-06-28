'use strict';

function BonusFactory(params) {
	this._img = params.img;
	this._clickCallback = params.click;
}

BonusFactory.prototype.create = function(entity) {
	entity.addComponent(new CollidableComponent());
	entity.addComponent(new PhysicsComponent());
	entity.addComponent(new VisibilityComponent());
	//entity.addComponent(new BlinkingComponent());
	entity.addComponent(this._getNewRenderComponent());
}

BonusFactory.prototype._getNewRenderComponent = function() {
	var img = this._img.cloneNode();
	img.className = 'bonus';
	img.onclick = this._clickCallback;
	document.body.appendChild(img);
	return new RenderComponent(img);
}