'use strict';

export default class Block {
	constructor(name, options = {}) {
		this._el = document.createElement(name);
		this.setAttrs(options);
	}

	/**
	 * Добавление атрибутов к созданному элементу
	 * @param {Object} attrs - список атрибутов
	 */
	setAttrs(attrs = {}) {
		Object.keys(attrs).forEach(name => {
			this._el.setAttribute(name, attrs[name]);
		});
	}

	/**
	 * Возращает элемент
	 * @returns {Element|*} - Возвращаемый элемент
	 */
	get() {
		return this._el;
	}
}
