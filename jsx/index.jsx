import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './app.jsx';
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Brands from './pages/brands.jsx'
import Brands_Detail from './pages/brands_detail.jsx'
import Not_Found from './pages/not_found.jsx'

const wrap = (name, component) => (
	<App pageName={name}>{component}</App>
);
const Routed = () => (
	<Router>
		<Switch>
			<Route exact path='/' render={() => wrap('Home', <Home />)} />
			<Route exact path='/about' render={() => wrap('About', <About />)} />
            <Route exact path='/brands' render={() => wrap('Brands', <Brands />)} />
            <Route exact path='/brands/:id' render={({ match }) => wrap('Brands', <Brands_Detail id={match.params.id} />)} />
            <Route exact path='/products' render={() => wrap('About', <About />)} />
            <Route exact path='/types' render={() => wrap('About', <About />)} />
            <Route exact path='/tags' render={() => wrap('About', <About />)} />
			<Route path='*' render={() => wrap('Not Found', <Not_Found />)} />
		</Switch>
	</Router>
);

ReactDOM.render(
	(<Routed />),
	document.getElementById('react-root')
);
