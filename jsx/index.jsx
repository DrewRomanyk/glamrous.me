import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './app.jsx';
import Home from './pages/home.jsx'

const wrap = (name, component) => (
	<App pageName={name}>{component}</App>
);
const Routed = () => (
	<Router>
		<Switch>
			<Route exact path='/' render={() => wrap('Home', <Home />)} />
			<Route path='/about' render={() => wrap('About', <Home />)} />
			<Route path='/' render={() => wrap('Not Found', <div>404</div>)} />
		</Switch>
	</Router>
);

ReactDOM.render(
	(<Routed />),
	document.getElementById('react-root')
);
