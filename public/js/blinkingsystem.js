'use strict';

function BlinkingSystem(entityFactory) {
	SystemBase.call(this, entityFactory);
}

BlinkingSystem.prototype = Object.create(SystemBase.prototype);
BlinkingSystem.prototype.constructor = BlinkingSystem;

BlinkingSystem.prototype._updateEntity = function(entity, dt) {
	if (!entity.components.blinking || !entity.components.visibility) {
		return;
	}
	entity.components.blinking.time += dt;
	if (entity.components.blinking.time > 0.5*Math.PI) {
		entity.components.visibility.visibility = 1;
		entity.removeComponent('blinking');
	} else {
		entity.components.visibility.visibility = 0.5 * Math.sin(20*entity.components.blinking.time) + 1;
	}
}
