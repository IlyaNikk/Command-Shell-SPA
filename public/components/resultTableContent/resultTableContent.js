'use strict';

import Block from '../block/block';
import './resultTableContent.scss';

export default class ResultTableContent extends Block {
	constructor() {
		super('div', {});
		this.get().classList.add('result-form-table__content');
	}

	fillLine(allColumns, columnData) {
		Object.keys(allColumns).forEach((columnName) => {
			const span = new Block('span', {});
			span.get().classList.add('result-form-table__' + columnName + '-column-content');
			if (columnData[columnName]) {
				span.get().innerHTML = columnData[columnName];
			} else {
				span.get().innerHTML = '';
			}
			if (columnName === 'status') {
				switch (columnData[columnName]) {
					case 'Completed':
						span.get().classList.add('result-form-table__status-column-content__ok');
						break;
					case 'In progress':
						span.get().classList.add('result-form-table__status-column-content__wait');
						break;
					case 'Failed':
						span.get().classList.add('result-form-table__status-column-content__fail');
						break;
				}
			}
			this.get().appendChild(span.get());
		});
	}

	checkProgress(columns) {
		if (columns.status === 'In progress') {
			return true;
		}
		return false;
	}

	changeStatus(column, number) {
		const status = document.body.getElementsByClassName('result-form-table__status-column-content')[number];
		status.classList.remove('result-form-table__status-column-content__wait');
		status.innerHTML = column.status;
		switch (column.status) {
			case 'Completed':
				status.classList.add('result-form-table__status-column-content__ok');
				break;
			case 'In progress':
				status.classList.add('result-form-table__status-column-content__wait');
				break;
			case 'Failed':
				status.classList.add('result-form-table__status-column-content__fail');
				break;
		}
		document.body.getElementsByClassName('result-form-table__result-column-content')[number].innerHTML = column.result;
		document.body.getElementsByClassName('result-form-table__ftime-column-content')[number].innerHTML = column.ftime;
	}

}
