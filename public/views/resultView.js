'use strict';

import ResultTable from '../components/resultTable/resultTable';

export default class ResultView {
	constructor() {
		this.table = new ResultTable();
	}

	get() {
		return this.table.get();
	}

	setRouter(router) {
		this.router = router;
		this.table.setListeners(this.leaveResult.bind(this));
	}

	show() {
		this.table.startRefresh();
		document.body.getElementsByClassName('main-content')[0].appendChild(this.table.get());
	}

	pause() {
		document.body.getElementsByClassName('main-content')[0].removeChild(this.table.get());
	}

	leaveResult() {
		this.router.go('/enter');
	}

}
