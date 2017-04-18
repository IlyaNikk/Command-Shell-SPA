'use strict';


export default class CommandModel {
	constructor() {
		this.host = 'http://localhost:3000';
	}

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
		}).catch(err => {
			return Promise.reject();
		});
	}

	getCommands() {
		return fetch(this.host + '/result', {
			method: 'GET'
		}).then(res => {
			if (res.status >= 300) {
				throw new Error();
			}
			return res.json();
		}).catch(err => {
			return Promise.reject();
		});
	}
}
