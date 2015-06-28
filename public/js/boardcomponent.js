'use strict';

function BoardComponent() {
	ComponentBase.call(this, 'board');
	this.width = 0;
	this.height = 0;
}

BoardComponent.prototype = Object.create(ComponentBase.prototype);
BoardComponent.prototype.constructor = BoardComponent;