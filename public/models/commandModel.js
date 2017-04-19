'use strict';


export default class CommandModel {
	constructor() {
		this.host = 'http://localhost:3000';
	}

	/**
	 * Отправляет выполняеиую команду на сервер
	 * @param {string} command - команда
	 * @param {string} comment - комментарий к команде
	 * @returns {Promise.<TResult>} - Промис выполения запроса
	 */
	sendCommand(command, comment) {
		return fetch(this.host + '/perform', {
			method: 'POST',
			body: JSON.stringify({
				command,
				comment
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => {
			if (res.status >= 300) {
				throw new Error();
			}
			return res.json();
		});
	}


	/**
	 * Запршивает все команды из хранилища
	 * @returns {Promise.<TResult>} - Промис с ответом серевера
	 */
	getCommands() {
		return fetch(this.host + '/result', {
			method: 'GET'
		}).then(res => {
			if (res.status >= 300) {
				throw new Error();
			}
			return res.json();
		});
	}

}
