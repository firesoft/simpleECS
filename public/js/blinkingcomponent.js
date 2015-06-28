'use strict';

function BlinkingComponent() {
	ComponentBase.call(this, 'blinking');
	this.time = 0;
}

BlinkingComponent.prototype = Object.create(ComponentBase.prototype);
BlinkingComponent.prototype.constructor = BlinkingComponent;