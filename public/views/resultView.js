'use strict';

import ResultTable from '../components/resultTable/resultTable';

export default class ResultView {
	constructor() {
		this.mainContent = document.body.getElementsByClassName('main-content')[0];
		this.table = new ResultTable();
	}

	/**
	 * Получение вьюшки
	 * @returns {Element|*}
	 */
	get() {
		return this.table.get();
	}

	/**
	 * Устанавливает роутер для вьюшки
	 * @param router - роутер
	 */
	setRouter(router) {
		this.router = router;
		this.table.setListeners(this.leaveResult.bind(this));
	}

	/**
	 * Отображение вьюшки
	 */
	show() {
		this.table.startRefresh();
		this.mainContent.appendChild(this.table.get());
	}

	/**
	 * Скрытие вьюшки
	 */
	pause() {
		this.mainContent.removeChild(this.table.get());
	}

	/**
	 * Переход с вьюшки
	 */
	leaveResult() {
		this.router.go('/enter');
	}

}
