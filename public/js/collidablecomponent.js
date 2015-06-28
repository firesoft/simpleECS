'use strict';

function CollidableComponent() {
	ComponentBase.call(this, 'collidable');
}

CollidableComponent.prototype = Object.create(ComponentBase.prototype);
CollidableComponent.prototype.constructor = CollidableComponent;