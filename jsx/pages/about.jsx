import React from 'react';
import { Container, GridCell, Modal, PageHeader, Row } from '../ui/Bootstrap.jsx';
import find from 'lodash/find';

const TeamMember = (props) => (
	<GridCell lg={4} sm={6} text-center style={{marginBottom: '2em'}}>
		<img
			className='img-circle img-responsive img-center'
			src={'/static/img/about/' + props.image}
			alt=""
		/>
		<h3>{props.name}</h3>
		<h6>{props.role}</h6>
		<p>{props.about}</p>
		<div>Number of commits: {props.contrib.commits}</div>
		<div>Number of issues: {props.contrib.issues}</div>
		<div>Number of unit tests: {props.contrib.tests}</div>
	</GridCell>
);

const TheGlamFam = (props) => {
	const stats = (name) => {
		const block = find(props.stats, x => x.author === name);
		return block || { commits: '...', issues: '...' };
	};
	return (
		<Row>
			<TeamMember
				name='Thomas Gaubert'
				image='thomas.jpg'
				role='Devops & Frontend'
				about={"I'm an avid lover of the outdoors and the co-lead of Freetail "
					+ "Hackers. I'll be an intern at Microsoft this summer."}
				contrib={{...stats('ThomasGaubert'), tests: 0}}
			/>
			<TeamMember
				name='Drew Romanyk'
				image='drew.jpg'
				role='Frontend & Backend'
				about={"I'm currently a junior computer science student at The University of "
					+ "Texas at Austin. I'm the president of MAD, and currently going to "
					+ "intern with RetailMeNot over the summer."}
				contrib={{...stats('DrewRomanyk'), tests: 0}}
			/>
			<TeamMember
				name='Cameron Piel'
				image='cameron.jpg'
				role='Database & Backend'
				about={"My name is Cameron Piel, I am a 5th year student here at "
					+ "UT. When I am not coding or cooking you can find me sitting "
					+ "at my desk pretending to be productive."}
				contrib={{...stats('Cpiely'), tests: 0}}
			/>
			<TeamMember
				image='rperce.jpg'
				name='Robert Perce'
				role='Frontend & Devops'
				about={"Fourth-year Computer Science and Mathematics student at UT "
					+ "Austin. I'll be starting full-time at Indeed in July!"}
				contrib={{...stats('rperce'), tests: 0}}
			/>
			<TeamMember
				image='mpark.jpg'
				name='Melody Park'
				role='Frontend & Backend'
				about={"Fourth year UT student who likes to get swole. Weenie on "
					+ "the outside. Dragon on the inside."}
				contrib={{...stats('myopark'), tests: 0}}
			/>
			<TeamMember
				image='thomasp.jpg'
				name='Thomas Potnuru'
				role='API & Backend'
				about={"Currently a senior at UT Austin doing my Bachelor's in "
					+ "Computer Sceince. I am a IEEE Computer Society Officer "
					+ "again this year! Usually making and eating dessert in my "
					+ " free time."}
				contrib={{...stats('thomas-potnuru'), tests: 0}}
			/>
		</Row>
	)
};

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit_test_desc: "Running unit tests...",
            stats: {contributors: []}
        };
    }

	componentDidMount() {
		$.getJSON(document.location.origin + '/api/about/contributions')
			.then((data) => {
				this.setState({stats: data});
			});
	}
    runUnitTests() {
        console.log("running unit tests...");
        $.getJSON(document.location.origin + '/api/test')
            .then((data) => {
                this.setState({unit_test_desc: data.result});
            });
    }

    render() {
    	const totalStats = this.state.stats.totals || {commits: '...', issues: '...'};
        return (
			<Container>
				<Row>
					<GridCell lg={12}>
						<PageHeader>Meet The Glam Fam</PageHeader>
                        <p>Welcome to glamrous.me! This web app is a way to get access to all of your favorite cosmetics
							in one quick glance.</p>
                        <a href="/report1">Technical Report #1</a>
					</GridCell>
				</Row>
				<TheGlamFam stats={this.state.stats.contributors}/>
				<Row>
					<GridCell lg={4}>
						<PageHeader>Stats</PageHeader>
                        <ul>
                            <li>{'Number of commits: ' + totalStats.commits + ' (excluding merge commits)'}</li>
                            <li>{'Number of issues: ' + totalStats.issues}</li>
                            <li>Number of unit tests: 15</li>
                            <li><a href="http://docs.glamrousme.apiary.io/#">Apiary API</a></li>
                            <li><a href="https://github.com/DrewRomanyk/glamrous.me/issues">Github Issue Tracker</a>
                            </li>
                            <li><a href="https://github.com/DrewRomanyk/glamrous.me">Github Repo</a></li>
                        </ul>
					</GridCell>
					<GridCell lg={4}>
						<PageHeader>Data</PageHeader>
                        <li><a href="http://makeup-api.herokuapp.com/">Makeup API</a> - used to collect all the
                            information
                            about each cosmetics brand, product, and details
                            about those objects.
                        </li>
					</GridCell>
					<GridCell lg={4}>
						<PageHeader>Tools</PageHeader>
                        <li>Bootstrap - Frontend framework to simplify building pages.</li>
                        <li>React - Frontend engine to power all of our clientside rendering and routing.</li>
                        <li>Flask - Python server engine to power all the api and forward all non-api routing to
                            React.
                        </li>
                        <li>Slack - Group messaging to communicate effectively as a group.</li>
                        <li>Github - A git repository hosting service.</li>
                        <li>Apiary - An API documentation service.</li>
					</GridCell>
				</Row>

				<Row>
					<GridCell lg={12}>
						<PageHeader>Unit Tests</PageHeader>
                        <button onClick={(e) => this.runUnitTests(e)} type="button"
                                className="btn btn-info btn-lg antisocial" data-toggle="modal"
                                data-target="#myModal">Run
                        </button>
					</GridCell>
				</Row>

				<Modal.Modal id="myModal">
					<Modal.Header>
						<Modal.CloseX />
						<Modal.Title>Tests</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<pre><code>{this.state.unit_test_desc}</code></pre>
					</Modal.Body>
					<Modal.Footer>
						<Modal.CloseButton />
					</Modal.Footer>
				</Modal.Modal>

			</Container>
        );
    }
}
