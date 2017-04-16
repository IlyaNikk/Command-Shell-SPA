'use strict';

import pathToRegex from './pathToRegex';

let id = 0;

export default class Route {
	/**
	 * Создаёт новый Route - ассоциирует некоторую view с шаблоном пути
	 * @param {string} pathname - Шаблон пути
	 * @param {View} view - Класс конкретной View
	 * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
	 */
	constructor(pathname, view, options = {}){

		this.id = 'p' + id;
		id++;
		this.pathname = pathname;
		this.regex = pathToRegex(pathname);
		this.View = view;
		this.options = options;
	}

	/**
	 * Проверяет, соответствует ли переданный pathname текущему Route
	 * @param {string} pathname - Путь в приложении
	 * @returns {boolean} Результат проверки
	 */
	match(pathname) {
		return !!this.regex(pathname);
	}

	/**
	 * Активирует текущий Route (переходит по нему)
	 * @param {string} pathname - Путь в приложении
	 * @param {Object} [state={}] - Объект state, который был передан в событие popstate для объекта window
	 */
	navigate(pathname, state = {}) {
		state = state || {};
		const keys = this.regex(pathname);
		if (!this._view) {
			const view = new this.View();
			view.setRouter(this.__router);
			this._view = view;
		}
		this._view.show();
	}

	/**
	 * Деактивирует текущий Route
	 */
	leave() {
		if (this._view) {
			this._view.pause();
		}
	}

	/**
	 * Устанавливает текущему Route инстанс роутера
	 * @param {Router} router - Инстанс роутера
	 */
	setRouter(router) {
		this.__router = router;
	}
}
