'use strict';

import ResultTableHeader from '../resultTableHeader/resultTableHeader';
import ResultTableContent from '../resultTableContent/resultTableContent';
import CommandModel from '../../models/commandModel';
import Block from '../block/block';
import './resultTable.scss';

export default class ResultTable extends Block {
	constructor() {
		super('section', {});

		this.allColumns = {
			command: 'Command',
			comment: 'Comment',
			status: 'Status',
			result: 'Result',
			ltime: 'Ltime',
			ftime: 'Ftime'
		};
		this.content = [];
		this.progress = [];

		this.get().classList.add('result-form-section');
		const header = new Block('h1', {});
		header.get().innerHTML = 'Perform Results';
		this.table = new Block('div', {});
		this.table.get().classList.add('result-form-table');
		const tableHeader = new ResultTableHeader();
		this.get().appendChild(header.get());
		this.table.get().appendChild(tableHeader.get());
		this.get().appendChild(this.table.get());
		this.crateButtonForm();
		this.getInfo();
	}

	crateButtonForm() {
		const form = new Block('form', {});
		form.get().classList.add('result-form-buttons');
		this.enter = new Block('button', {
			type: 'submit'
		});
		this.enter.get().classList.add('result-form-buttons__enter');
		this.enter.get().innerHTML = 'Enter shell command';
		form.get().appendChild(this.enter.get());
		this.get().appendChild(form.get());
	}

	setListeners(callback) {
		this.enter.get().addEventListener('click', () => {
			clearInterval(this.interval);
			callback();
		}, false);
	}

	getInfo() {
		new CommandModel().getCommands()
			.then(res => {
				if (this.count && this.count !== res.length) {
					const allInfo = document.body.getElementsByClassName('result-form-table__content');
					const infoCount = allInfo.length;
					for (let i = 0; i < infoCount; ++i) {
						document.body.getElementsByClassName('result-form-table')[0]
							.removeChild(allInfo[0]);
					}
					this.changeProgress();
					this.setContent(res);
					this.count = document.body.getElementsByClassName('result-form-table__content').length;
				} else if (!this.count) {
					this.setContent(res);
					this.count = res.length;
				}
				if (this.progress.length !== 0) {
					this.progress.forEach((rowNum, i) => {
						if (!this.content[rowNum].checkProgress(res[rowNum])) {
							this.changeProgress(res);
						}
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	startRefresh() {
		this.interval = setInterval(this.getInfo.bind(this), 2000);
	}

	setContent(res) {
		let count = 0;
		res.forEach((column, i) => {
			this.content[i] = new ResultTableContent();
			const check = this.content[i].checkProgress(column);
			if (check) {
				this.progress[count] = i;
				++count;
			}
			this.content[i].fillLine(this.allColumns, column);
			const table = document.body.getElementsByClassName('result-form-table')[0];
			table.appendChild(this.content[i].get());
		});
	}

	changeProgress(res) {
		this.progress.forEach((number, i, array) => {
			this.content[number].changeStatus(res[number], number);
			delete array[i];
		});
	}

}
