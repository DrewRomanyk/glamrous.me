/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React from 'react';
import marked from 'marked';
import { Container } from '../ui/Bootstrap.jsx';

export default class Report extends React.Component {
	constructor(props) {
		super(props);
		this.state = {markdown: ''};
	}
	componentDidMount() {
		$.get(document.location.origin + '/static/report3.md')
			.then((data) => {
				this.setState({markdown: data});
			});
	}
	render() {
		const md = marked(this.state.markdown);
		return (
			<Container>
				<div dangerouslySetInnerHTML={{__html: md}} />
			</Container>
		);
	}
}
