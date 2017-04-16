'use strict';

import ResultTableHeader from '../resultTableHeader/resultTableHeader';
import ResultTableContent from '../resultTableContent/resultTableContent';
import CommandModel from '../../models/commandModel';
import Block from '../block/block';
import './resultTable.css'

export default class ResultTable extends Block {
	constructor() {
		super('section', {});
		this.get().classList.add('result-form-section');
		let header = new Block('h1', {});
		header.get().innerHTML = 'Perform Results';
		this.table = new Block('div', {});
		this.table.get().classList.add('result-form-table');
		let tableHeader = new ResultTableHeader();
		// let content = new ResultTableContent();
		// let content1 = new ResultTableContent();
		// let content2 = new ResultTableContent();

		this.getInfo();

		this.get().appendChild(header.get());
		this.table.get().appendChild(tableHeader.get());
		// table.get().appendChild(content.get());
		this.get().appendChild(this.table.get());
		this.crateButtonForm();
	}

	crateButtonForm() {
		let form = new Block('form', {});
		form.get().classList.add('result-form-buttons');
		this.enter = new Block('button', {});
		this.enter.get().classList.add('result-form-buttons__enter');
		this.enter.get().innerHTML = 'Enter shell command';
		this.refresh = new Block('button', {
			type: 'submit'
		});
		this.refresh.get().classList.add('result-form-buttons__refresh');
		this.refresh.get().innerHTML = 'Refresh';
		form.get().appendChild(this.enter.get());
		form.get().appendChild(this.refresh.get());
		this.get().appendChild(form.get());
	}

	setListeners(callback) {
		this.enter.get().addEventListener('click', callback, false);
	}

	getInfo() {
		let allColumns = {
			command: 'Command',
			comment: 'Comment',
			status: 'Status',
			result: 'Result',
			ltime: 'Ltime',
			ftime: 'Ftime'
		};
		new CommandModel().getCommands()
			.then(res => {
				for(let position in res){
					let content = new ResultTableContent();
					content.fillLine(allColumns, res[position]);
					let table = document.body.getElementsByClassName('result-form-table')[0];
					table.appendChild(content.get());
				}
			})
			.catch(err => {
				console.log("Error");
			});
	}
}

