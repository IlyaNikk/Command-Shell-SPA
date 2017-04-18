'use strict';

import Block from '../block/block';
import CommandModel from '../../models/commandModel';
import './commandInput.scss';

export default class CommandInput extends Block {
	constructor() {
		super('section');
		this.get().classList.add('command-input-section');
		const title = new Block('h1');
		title.get().innerHTML = 'Shell command form';
		title.get().classList.add('command-input-title');
		this.form = new Block('form');
		this.form.get().classList.add('command-input-form');
		this.addInput({
			text: 'Enter shell command:',
			id: 'command',
			placeholder: 'ls'
		});
		this.addInput({
			text: 'Enter a comment for command:',
			id: 'comment',
			placeholder: 'List directory contents'
		});
		this.addButtons();
		this.get().appendChild(title.get());
		this.get().appendChild(this.form.get());
	}

	/**
	 * Добавление полей ввода в форму
	 * @param {string} text - Текст-поясненние для поля ввода
	 * @param {string} id - Айдишник поля ввода
	 * @param {string} placeholder - Текст пояснение для поля ввода
	 */
	addInput({text, id, placeholder}) {
		const span = new Block('span');
		span.get().classList.add('command-input-form__row');
		const label = new Block('label', {
			for: id
		});
		label.get().innerHTML = text;
		label.get().classList.add('command-input-form__label');
		const input = new Block('input', {
			id,
			name: id,
			type: 'text',
			placeholder,
		});
		input.get().classList.add('command-input-form__input');
		span.get().appendChild(label.get());
		span.get().appendChild(input.get());
		this.form.get().appendChild(span.get());
	}

	/**
	 * Добавление кнопок в форму
	 */
	addButtons() {
		const div = new Block('div', {});
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
		this.form.get().appendChild(div.get());
	}

	/**
	 * Вешаем обработчики событий кнопок
	 * @param callback - функция для вызова при нажатии кнопки назад
	 */
	setListeners(callback) {
		this.back.get().addEventListener('click', callback, false);
		this.button.get().addEventListener('click', this.buttonListenerFunction.bind(this), false);
	}

	/**
	 * Функция-обработчик нажатия кнопки отправки
	 * @param event - событие нажатия
	 */
	buttonListenerFunction(event) {
		event.preventDefault();
		const inputs = document.body.getElementsByClassName('command-input-form__input');
		const command = inputs[0].value;
		const comment = inputs[1].value;
		new CommandModel().sendCommand(command, comment)
			.then(res => {
				this.resultCallback('Command send successfully', 'command-input-form__ok-message');
			})
			.catch(err => {
				this.resultCallback('There is some error. Please, try again', 'command-input-form__error-message');
			});
	}

	/**
	 * Удаление событий с кнопок
	 * @param callback - функция-обработчик на кнопку назад
	 */
	removeListeners(callback) {
		this.back.get().removeEventListener('click', callback, false);
		this.button.get().removeEventListener('click', this.buttonListenerFunction, false);
	}

	/**
	 * Отображения результат выполнения запроса на выполнение команды на сервере
	 * @param {string} message - Сообщение
	 * @param {string} messageClass - Класс сообщения
	 */
	resultCallback(message, messageClass) {
		const span = new Block('span', {});
		span.get().classList.add(messageClass);
		span.get().innerHTML = message;
		if (document.body.getElementsByClassName('command-input-form')[0]) {
			this.form.get().insertBefore(span.get(),
				document.body.getElementsByClassName('command-input-form__button-block')[0]);
			setTimeout(() => {
				if (document.body.getElementsByClassName('command-input-form')[0]) {
					this.form.get()
						.removeChild(document.body.getElementsByClassName(messageClass)[0]);
				}
			}, 3000);
		}
	}

	/**
	 * Удаления сообщения о результате выполнения
	 */
	removeMessage() {
		if (document.body.getElementsByClassName('command-input-form__ok-message')[0]) {
			this.form.get()
				.removeChild(document.body.getElementsByClassName('command-input-form__ok-message')[0]);
		} else if (document.body.getElementsByClassName('command-input-form__error-message')[0]) {
			this.form.get()
				.removeChild(document.body.getElementsByClassName('command-input-form__error-message')[0]);
		}
	}
}
