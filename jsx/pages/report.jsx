import React from 'react';
import marked from 'marked';

export default class Report extends React.Component {
	constructor(props) {
		super(props);
		this.state = {markdown: ''};
	}
	componentDidMount() {
		$.get(document.location.origin + '/static/report1.md')
			.then((data) => {
				this.setState({markdown: data});
			});
	}
	render() {
		const md = marked(this.state.markdown);
		return (
			<div className='container'>
				<div dangerouslySetInnerHTML={{__html: md}} />
			</div>
		);
	}
};
