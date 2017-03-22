import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './app.jsx';
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Brands from './pages/brands.jsx'

const wrap = (name, component) => (
	<App pageName={name}>{component}</App>
);
const Routed = () => (
	<Router>
		<Switch>
			<Route exact path='/' render={() => wrap('Home', <Home />)} />
			<Route path='/about' render={() => wrap('About', <About />)} />
            <Route path='/brands' render={() => wrap('Brands', <Brands />)} />
            <Route path='/products' render={() => wrap('About', <About />)} />
            <Route path='/types' render={() => wrap('About', <About />)} />
            <Route path='/tags' render={() => wrap('About', <About />)} />
			<Route path='/' render={() => wrap('Not Found', <div>404</div>)} />
		</Switch>
	</Router>
);

ReactDOM.render(
	(<Routed />),
	document.getElementById('react-root')
);
