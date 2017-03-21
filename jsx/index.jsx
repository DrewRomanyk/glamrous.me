import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './app.jsx';
import Home from './pages/home.jsx'

const pages = [
	{	name: 'About',
		path: '/about',
		component: (<Home />),
	}
];
const Routed = () => (
	<Router>
		<div>
			<Route exact path='/' render={() => (
				<App pageName='Home'>
					<Home />
				</App>
			)} />
			{pages.forEach((page) => (
				<Route path={page.path} render={() => (
					<App pageName={page.name}>
						{page.component}
					</App>
				)} />
			))}
		</div>
	</Router>
);

// pretend we're routing on /
ReactDOM.render(
	(<Routed />),
	document.getElementById('react-root')
);
