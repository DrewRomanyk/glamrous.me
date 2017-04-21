import React from 'react';
import { Container } from '../ui/Bootstrap.jsx';
import Col from 'jsxstyle/Col';
import Block from 'jsxstyle/Block';
import WindowSizeWatcher from '../ui/WindowSizeWatcher.jsx';

export default class Visualization extends React.Component {
	constructor() {
		super();


		this.state = {
			width: 800,
		};
	}
	componentDidMount() {
		let d3 = document.createElement('script');
		d3.type   = 'text/javascript';
		d3.async  = false;
		d3.src    = '//d3js.org/d3.v4.min.js';
		document.body.appendChild(d3);

		let vis = document.createElement('script');
		vis.type  = 'text/javascript';
		vis.async = false;
		vis.src   = '/static/js/visualization.js';
		document.body.appendChild(vis);
	}

	sizeUpdated = ({width}) => {
		this.setState({width: width});
	}

	render() {
		return (
			<WindowSizeWatcher onSizeChange={this.sizeUpdated}>
				<Container>
					<Col justifyContent='center' alignItems='center'>
						<Block fontSize='large' textAlign='center'>
							Stars of <a href='//spacecowboys.me/'>SpaceCowboys</a> projected
							onto a celestial sphere (as seen as if Earth was in the center).
						</Block>
						<Block textAlign='center'>
							Diameter of star in pixels is number of solar diameters of star.
						</Block>
						<div id='canvas-holder' style={{width: Math.min(800, this.state.width)}}/>
					</Col>
				</Container>
			</WindowSizeWatcher>
		);
	}
}
