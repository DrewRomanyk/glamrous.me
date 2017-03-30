import React from 'react';
import find from 'lodash/find';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit_test_desc: "Running unit tests..."
        };
    }

	componentDidMount() {
		$.getJSON(document.location.origin + '/api/about/contributions')
			.then((data) => {
				this.setState({contrib: data});
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
		const getCommitsFor = (name) => {
			const obj = find(this.state.contrib, s => s.author === name);
			if (obj)  {
				return obj.commits;
			}
			return "...";
		};
		const getIssuesFor = (name) => {
			const obj = find(this.state.contrib, s => s.author === name);
			if (obj)  {
				return obj.issues;
			}
			return "...";
		};

        return (
            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="page-header">Meet The Glam Fam</h2>
                        <p>Welcome to glamrous.me! This web app is a way to get access to all of your favorite cosmetics
                            in one
                            quick glance.</p>
                        <a href="/report1">Technical Report #1</a>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="col-lg-4 col-sm-6 text-center">
                        <img className="img-circle img-responsive img-center" src="/static/img/about/thomas.jpg"
                             alt=""/>
                        <h3>Thomas Gaubert</h3>
                        <h6>Devops & Frontend</h6>
                        <p>I'm an avid lover of the outdoors and the co-lead of Freetail Hackers. I'll be an intern at
                            Microsoft this summer.</p>
                        <p>{'Number of commits: ' + getCommitsFor('ThomasGaubert')}</p>
						<p>{'Number of issues: ' + getIssuesFor('ThomasGaubert')}</p>
                        <p>Number of unit tests: 0</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center">
                        <img className="img-circle img-responsive img-center" src="/static/img/about/drew.jpg" alt=""/>
                        <h3>Drew Romanyk</h3>
                        <h6>Frontend & Backend</h6>
                        <p>I'm currently a junior computer science student at The University of Texas at Austin. I'm the
                            president of MAD, and currently going to intern with RetailMeNot over the summer.</p>
                        <p>{'Number of commits: ' + getCommitsFor('DrewRomanyk')}</p>
						<p>{'Number of issues: ' + getIssuesFor('DrewRomanyk')}</p>
                        <p>Number of unit tests: 0</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center">
                        <img className="img-circle img-responsive img-center" src="/static/img/about/cameron.jpg"
                             alt=""/>
                        <h3>Cameron Piel</h3>
                        <h6>Database & Backend</h6>
                        <p>My name is Cameron Piel, I am a 5th year student here at UT. When I am not coding or cooking
                            you can
                            find me sitting at my desk pretending to be productive.</p>
                        <p>{'Number of commits: ' + getCommitsFor('Cpiely')}</p>
						<p>{'Number of issues: ' + getIssuesFor('Cpiely')}</p>
                        <p>Number of unit tests: 15</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center">
                        <img className="img-circle img-responsive img-center" src="static/img/about/rperce.jpg"
                             alt="Robert Perce"/>
                        <h3>Robert Perce</h3>
                        <h6>Frontend & Devops</h6>
                        <p>Fourth-year Computer Science and Mathematics student at UT Austin. I'll be starting full-time
                            at
                            Indeed in July!</p>
                        <p>{'Number of commits: ' + getCommitsFor('rperce')}</p>
						<p>{'Number of issues: ' + getIssuesFor('rperce')}</p>
                        <p>Number of unit tests: 0</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center">
                        <img className="img-circle img-responsive img-center" src="static/img/about/mpark.jpg"
                             alt="Melody Park, get it, hahahaha"/>
                        <h3>Melody Park</h3>
                        <h6>Frontend & Backend</h6>
                        <p>Fourth year UT student who likes to get swole. Weenie on the outside. Dragon on the
                            inside.</p>
                        <p>{'Number of commits: ' + getCommitsFor('myopark')}</p>
						<p>{'Number of issues: ' + getIssuesFor('myopark')}</p>
                        <p>Number of unit tests: 0</p>
                    </div>
                    <div className="col-lg-4 col-sm-6 text-center">
                        <img className="img-circle img-responsive img-center" src="/static/img/about/thomasp.jpg"
                             alt=""/>
                        <h3>Thomas Potnuru</h3>
                        <h6>API & Backend</h6>
                        <p>Currently a senior at UT Austin doing my Bachelor's in Computer Sceince. I am a IEEE Computer
                            Society Officer again this year! Usually making and eating dessert in my free time. </p>
                        <p>{'Number of commits: ' + getCommitsFor('thomas-potnuru')}</p>
						<p>{'Number of issues: ' + getIssuesFor('thomas-potnuru')}</p>
                        <p>Number of unit tests: 0</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <h1 className="page-header">Stats</h1>
                        <ul>
                            <li>Number of commits: 97</li>
                            <li>Number of issues: 15</li>
                            <li>Number of unit tests: 15</li>
                            <li><a href="http://docs.glamrousme.apiary.io/#">Apiary API</a></li>
                            <li><a href="https://github.com/DrewRomanyk/glamrous.me/issues">Github Issue Tracker</a>
                            </li>
                            <li><a href="https://github.com/DrewRomanyk/glamrous.me">Github Repo</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <h1 className="page-header">Data</h1>
                        <li><a href="http://makeup-api.herokuapp.com/">Makeup API</a> - used to collect all the
                            information
                            about each cosmetics brand, product, and details
                            about those objects.
                        </li>
                    </div>
                    <div className="col-lg-4">
                        <h1 className="page-header">Tools</h1>
                        <li>Bootstrap - Frontend framework to simplify building pages.</li>
                        <li>React - Frontend engine to power all of our clientside rendering and routing.</li>
                        <li>Flask - Python server engine to power all the api and forward all non-api routing to
                            React.
                        </li>
                        <li>Slack - Group messaging to communicate effectively as a group.</li>
                        <li>Github - A git repository hosting service.</li>
                        <li>Apiary - An API documentation service.</li>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Unit Tests</h1>
                        <button onClick={(e) => this.runUnitTests(e)} type="button"
                                className="btn btn-info btn-lg antisocial" data-toggle="modal"
                                data-target="#myModal">Run
                        </button>
                        <div id="myModal" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Tests</h4>
                                    </div>
                                    <div className="modal-body">
                                        <p>{this.state.unit_test_desc}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
