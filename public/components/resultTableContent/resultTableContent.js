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
			span.get().innerHTML = columnData[columnName];
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


}
