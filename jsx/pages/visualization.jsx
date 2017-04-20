import React from 'react';
import { Container } from '../ui/Bootstrap.jsx';
import Col from 'jsxstyle/Col';
import Block from 'jsxstyle/Block';

export default class Visualization extends React.Component {
	componentDidMount() {
		let d3  = document.createElement('script');
		d3.type = 'text/javascript';
		d3.async= false;
		d3.src  = '//d3js.org/d3.v4.min.js';
		document.body.appendChild(d3);

		let s   = document.createElement('script');
		s.type  = 'text/javascript';
		s.async = false;
		s.src   = '/static/js/visualization.js';
		document.body.appendChild(s);
	}
	render() {
		return (
			<Container>
				<Col justifyContent='center' alignItems='center'>
					<Block fontSize='large'>
						Stars of <a href='//spacecowboys.me/'>SpaceCowboys</a> projected
						onto a celestial sphere (as seen from the outside).
					</Block>
					<Block>
						Diameter of star in pixels is number of solar diameters of star.
					</Block>
					<div id='canvas-holder' />
				</Col>
			</Container>
		);
	}
}
