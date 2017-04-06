import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './app.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Report from './pages/report.jsx';
import Brands from './pages/brands.jsx';
import Brands_Detail from './pages/brands_detail.jsx';
import Products from './pages/products.jsx';
import Products_Details from './pages/products_detail.jsx';
import Tags from './pages/tags.jsx';
import Tags_Details from './pages/tags_detail.jsx';
import Categories from './pages/categories.jsx';
import Categories_Details from './pages/categories_detail.jsx';
import Not_Found from './pages/not_found.jsx';

const wrap = (name, component) => (
	<App pageName={name}>{component}</App>
);

const route = (path, name, component, id=false) => {
	const renderFN = ({ match }) => {
		const props = id ? {id : match.params.id} : {};
		return wrap(name, React.createElement(component, props, null));
	};
	return (<Route exact path={path} render={renderFN} />);
};

const Routed = () => (
	<Router>
		<Switch>
			<Route exact path='/' render={() => wrap('Home', <Home />)} />
			{route('/about',          'About',      About)}
			{route('/report',         'Report',     Report)}
			{route('/brands',         'Brands',     Brands)}
			{route('/brands/:id',     'Brands',     Brands_Detail,      true)}
			{route('/products',       'Products',   Products)}
			{route('/products/:id',   'Products',   Products_Details,   true)}
			{route('/categories',     'Categories', Categories)}
			{route('/categories/:id', 'Products',   Categories_Details, true)}
			{route('/tags',           'Tags',       Tags)}
			{route('/tags/:id',       'Tags',       Tags_Details,       true)}
			<Route path='*' render={() => wrap('Not Found', <Not_Found />)} />
		</Switch>
	</Router>
);

ReactDOM.render(
	(<Routed />),
	document.getElementById('react-root')
);
