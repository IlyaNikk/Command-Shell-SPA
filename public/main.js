'use strict';

import InputView from './views/inputView';
import ResultView from './views/resultView';
import Block from './components/block/block';
import Router from './routing/router';
import './styles/style.scss';

// let mainBlock = new Block('main');
// mainBlock.get().classList.add('main-content');
// // let input = new InputView();
// // mainBlock.get().appendChild(input.get());
//
// // let result = new ResultView();
// // mainBlock.get().appendChild(result.get());
// document.body.appendChild(mainBlock.get());

(new Router())
	.addRoute('/enter', InputView)
	.addRoute('/', ResultView)
	.start({});
