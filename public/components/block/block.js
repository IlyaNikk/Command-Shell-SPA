'use strict';

export default class Block {
	constructor(name, options = {}) {
		this._el = document.createElement(name);
		this.setAttrs(options);
	}

	setAttrs(attrs = {}) {
		Object.keys(attrs).forEach(name => {
			this._el.setAttribute(name, attrs[name]);
		});
	}

	get() {
		return this._el;
	}
}
