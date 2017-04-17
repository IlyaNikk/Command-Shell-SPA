'use strict';

import Block from '../block/block';
import CommandModel from '../../models/commandModel';
import './commandInput.css';

export default class CommandInput extends Block {
	constructor() {
		super('section');
		this.get().classList.add('command-input-section');
		let title = new Block('h1');
		title.get().innerHTML = 'Shell command form';
		title.get().classList.add('command-input-title');
		let form = new Block('form');
		form.get().classList.add('command-input-form');
		this.addInput({
			form: form,
			text: 'Enter shell command:',
			id: 'command',
			placeholder: 'ls'
		});
		this.addInput({
			form: form,
			text: 'Enter a comment for command:',
			id: 'comment',
			placeholder: 'List directory contents'
		});
		this.addButtons(form);
		this.get().appendChild(title.get());
		this.get().appendChild(form.get());
	}

	addInput({form, text, id, placeholder}) {
		let span = new Block('span');
		let label = new Block('label', {
			for: id
		});
		label.get().innerHTML = text;
		label.get().classList.add('command-input-form__label');
		let input = new Block('input', {
			id: id,
			name: id,
			type: 'text',
			placeholder: placeholder,
		});
		input.get().classList.add('command-input-form__input');
		span.get().appendChild(label.get());
		span.get().appendChild(input.get());
		form.get().appendChild(span.get());
	}

	addButtons(form) {
		let div = new Block('div', {});
		div.get().classList.add('command-input-form__button-block');
		this.button = new Block('button', {
			type: 'submit'
		});
		this.button.get().innerHTML = 'Perform';
		this.button.get().classList.add('command-input-form__button');
		this.back = new Block('buton', {});
		this.back.get().innerHTML = 'Back to result';
		this.back.get().classList.add('command-input-form__back-button');
		div.get().appendChild(this.back.get());
		div.get().appendChild(this.button.get());
		form.get().appendChild(div.get());
	}

	setListeners(callback) {
		this.back.get().addEventListener('click', callback, false);
		this.button.get().addEventListener('click', this.buttonListenerFunction, false);
	}

	buttonListenerFunction(event) {
		event.preventDefault();
		let inputs = document.body.getElementsByClassName('command-input-form__input');
		let command = inputs[0].value;
		let comment = inputs[1].value;
		new CommandModel().sendCommand(command, comment)
			.then(res => {
				console.log(res);
			});

	}

	removeListeners(callback) {
		this.back.get().removeEventListener('click', callback, false);
		this.button.get().removeEventListener('click', this.buttonListenerFunction, false);
	}
}
