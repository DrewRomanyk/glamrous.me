import React, { PropTypes } from 'react';

export default class WindowSizeWatcher extends React.Component {
	updateDimensions = () => {
		const element = document.documentElement;
		const body = document.getElementsByTagName('body')[0];
		const width = window.innerWidth || element.clientWidth || body.clientWidth;
		const height = window.innerHeight || element.clientHeight || body.clientHight;
		this.props.onSizeChange({width: width, height: height});
	}
	componentWillMount() {
		this.updateDimensions();
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	render() {
		return this.props.children;
	}
}
WindowSizeWatcher.propTypes = {
	children: PropTypes.node,
	onSizeChange: PropTypes.func,
};
WindowSizeWatcher.defaultProps = {
	children: (<div></div>),
	onSizeChange: (() => {}),
};

