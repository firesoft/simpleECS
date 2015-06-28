'use strict';

function RenderComponent(img) {
	ComponentBase.call(this, 'render');
	this.img = img;
	this.width = img.width;
	this.height = img.height;
}

RenderComponent.prototype = Object.create(ComponentBase.prototype);
RenderComponent.prototype.constructor = RenderComponent;