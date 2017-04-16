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
		this.get().appendChild(header.get());
		this.table.get().appendChild(tableHeader.get());
		this.get().appendChild(this.table.get());
		this.crateButtonForm();
		this.getInfo();
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
		this.enter.get().addEventListener('click', () => {
			clearInterval(this.interval);
			callback();
		}, false);
		this.refresh.get().addEventListener('click', event => {
			event.preventDefault();
			this.getInfo();
		})
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
				console.log(this.count, res.length,this.count && this.count !== res.length );
				if (this.count && this.count !== res.length) {
					let allInfo = document.body.getElementsByClassName('result-form-table__content');
					let infoCount = allInfo.length;
					for (let i = 0; i < infoCount; ++i) {
						document.body.getElementsByClassName('result-form-table')[0]
							.removeChild(document.body.getElementsByClassName('result-form-table__content')[0]);
					}
					for (let position in res) {
						let content = new ResultTableContent();
						content.fillLine(allColumns, res[position]);
						let table = document.body.getElementsByClassName('result-form-table')[0];
						table.appendChild(content.get());
					}
					this.count = document.body.getElementsByClassName('result-form-table__content').length;
				} else if (!this.count) {
					for (let position in res) {
						let content = new ResultTableContent();
						content.fillLine(allColumns, res[position]);
						let table = document.body.getElementsByClassName('result-form-table')[0];
						table.appendChild(content.get());
					}
					this.count = res.length;

				}
			})
			.catch(err => {
				console.log("Error");
			});
	}

	startRefresh() {
		this.interval = setInterval(this.getInfo.bind(this), 2000);
	}
}
