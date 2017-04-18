'use strict';


import CommandInput from '../components/commandInput/commandInput';

export default class InputView {
	constructor() {
		this.mainContent = document.body.getElementsByClassName('main-content')[0];
		this.view = new CommandInput();
	}

	/**
	 * Получение вьюшки
	 * @returns {Element|*} - вьюшка
	 */
	get() {
		return this.view.get();
	}

	/**
	 * Устанавливает для вьюшки роутер
	 * @param router - роутер
	 */
	setRouter(router) {
		this.router = router;
		this.view.setListeners(this.leaveInput.bind(this));
	}

	/**
	 * Отображение вьюшки
	 */
	show(){
	this.mainContent.appendChild(this.view.get());
		this.view.removeMessage();
	}

	/**
	 * Скрытие вьюшки
	 */
	pause() {
		this.view.removeListeners(this.leaveInput.bind(this));
		this.mainContent.removeChild(this.view.get());
	}

	/**
	 * Переход с вьюшки
	 */
	leaveInput() {
		this.router.go('/');
	}

}
