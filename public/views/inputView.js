'use strict';


import CommandInput from '../components/commandInput/commandInput';

export default class InputView{
	constructor(){
		this.view = new CommandInput();
	}

	get(){
		return this.view.get();
	}

	setRouter(router) {
		this.router = router;
		this.view.setListeners(this.leaveInput.bind(this));
	}

	show(){
		document.body.getElementsByClassName('main-content')[0].appendChild(this.view.get());
	}

	pause(){
		document.body.getElementsByClassName('main-content')[0].removeChild(this.view.get());
	}

	leaveInput(){
		this.router.go('/');
	}

}
