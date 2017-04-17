'use strict';

import Block from '../block/block';
import './resultTableContent.css'

export default class ResultTableContent extends Block {
	constructor() {
		super('div', {});
		this.get().classList.add('result-form-table__content');
	}

	fillLine(allColumns, columnData) {
		for (let columnName in allColumns) {
			let span = new Block('span', {});
			span.get().classList.add('result-form-table__' + columnName + '-column-content');
			if(columnData[columnName]) {
				span.get().innerHTML = columnData[columnName];
			} else {
				span.get().innerHTML = "";
			}
			if(columnName === 'status'){
				if(columnData[columnName] === 'Completed'){
					span.get().classList.add('result-form-table__status-column-content__ok');
				} else if(columnData[columnName] === 'In progress'){
					span.get().classList.add('result-form-table__status-column-content__wait');
				} else if (columnData[columnName] === 'Failed'){
					span.get().classList.add('result-form-table__status-column-content__fail');
				}
			}
			this.get().appendChild(span.get());
		}
	}

	checkProgress(columns){
		if(columns.status === 'In progress'){
			return true;
		} else {
			return false;
		}
	}

	changeStatus(column, number){
		console.log(column);
		let status = document.body.getElementsByClassName('result-form-table__status-column-content')[number];
		status.classList.remove('result-form-table__status-column-content__wait');
		status.innerHTML = column.status;
		if(column.status === 'Completed'){
			status.classList.add('result-form-table__status-column-content__ok');
		} else if(column.status === 'In progress'){
			status.classList.add('result-form-table__status-column-content__wait');
		} else if (column.status === 'Failed'){
			status.classList.add('result-form-table__status-column-content__fail');
		}
		document.body.getElementsByClassName('result-form-table__result-column-content')[number].innerHTML = column.result;
		document.body.getElementsByClassName('result-form-table__ftime-column-content')[number].innerHTML = column.ftime;
	}


}
