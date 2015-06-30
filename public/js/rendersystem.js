'use strict';

function RenderSystem() {
	SystemBase.call(this);
}

RenderSystem.prototype = Object.create(SystemBase.prototype);
RenderSystem.prototype.constructor = RenderSystem;

RenderSystem.prototype._updateEntity = function(entity, dt) {
	if (!entity.components.render || !entity.components.physics) {
		return;
	}
	var renderC = entity.components.render;
	var physicsC = entity.components.physics;
	renderC.img.style.left = (physicsC.position.x - (renderC.width / 2)) + "px";
	renderC.img.style.top = (physicsC.position.y - (renderC.height / 2)) + "px";

	renderC.img.style.transform = "rotate(" + Math.floor(physicsC.rotation) + "deg)";

	if (entity.components.visibility) {
		renderC.img.style.opacity = entity.components.visibility.visibility;
	}
}