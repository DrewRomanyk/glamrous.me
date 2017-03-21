import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import Home from './pages/home.jsx'

// pretend we're routing on /
ReactDOM.render(
	(<App pageName='Home'><Home /></App>),
	document.getElementById('react-root')
);
