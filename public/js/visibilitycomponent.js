'use strict';

function VisibilityComponent() {
	ComponentBase.call(this, 'visibility');
	this.visibility = 1;
}

VisibilityComponent.prototype = Object.create(ComponentBase.prototype);
VisibilityComponent.prototype.constructor = VisibilityComponent;