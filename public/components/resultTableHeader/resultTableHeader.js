'use strict';

import Block from '../block/block';
import './resultTableHeader.scss';

export default class ResultTableHeader extends Block {
	constructor() {
		super('div', {});
		this.get().classList.add('result-form-table__header');
		const allColumns = {
			command: 'Command',
			comment: 'Comment',
			status: 'Status',
			result: 'Result',
			ltime: 'Ltime',
			ftime: 'Ftime'
		};
		for (const column in allColumns) {
			this.createColumnHeader(allColumns[column]);
		}
	}

	createColumnHeader(column) {
		const span = new Block('span', {});
		span.get().classList.add('result-form-table__' + column.toLowerCase() + '-column-header');
		if (column === 'Ltime') {
			column = 'Launch Time';
		} else if (column === 'Ftime') {
			column = 'Finish Time';
		}
		span.get().innerHTML = column;
		this.get().appendChild(span.get());
	}
}

