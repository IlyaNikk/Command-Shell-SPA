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
			this.get().appendChild(span.get());
		}
	}


}
