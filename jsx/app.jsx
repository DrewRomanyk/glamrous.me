import React, { PropTypes } from 'react';
import Navbar from './ui/Navbar.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.pageName = props.pageName;
	}
	render() {
		return (
			<div>
				<Navbar />
				{this.props.children}
			</div>
		);
	}
}
App.propTypes = {
	pageName: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};
