'use strict';

import InputView from './views/inputView';
import ResultView from './views/resultView';
import Router from './routing/router';
import './styles/style.scss';

(new Router())
	.addRoute('/enter', InputView)
	.addRoute('/', ResultView)
	.start({});
