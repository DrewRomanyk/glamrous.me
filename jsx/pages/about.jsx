/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React, {PropTypes} from 'react';
import {Badge, Container, GridCell, Modal, PageHeader, Row} from '../ui/Bootstrap.jsx';
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
        <div><span className="badge">{props.contrib.commits}</span> commits</div>
        <div><span className="badge">{props.contrib.issues}</span> issues</div>
        <div><span className="badge">{props.contrib.tests}</span> unit tests</div>
    </GridCell>
);
TeamMember.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    contrib: PropTypes.shape({
        commits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        issues: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        tests: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
};

const TheGlamFam = (props) => {
    const stats = (name) => {
        const block = find(props.stats, x => x.author === name);
        return block || {commits: '...', issues: '...'};
    };
    return (
        <Row>
            <TeamMember
                name='Thomas Gaubert'
                image='thomas.jpg'
                role='Devops & Frontend'
                about={"I'm an avid lover of the outdoors and the co-lead of Freetail "
                + "Hackers. I'll be an intern at Microsoft this summer."}
                contrib={{...stats('ThomasGaubert'), tests: 6}}
            />
            <TeamMember
                name='Drew Romanyk'
                image='drew.jpg'
                role='Frontend & Backend & Devops'
                about={"I'm currently a junior computer science student at The University of "
                + "Texas at Austin. I'm the president of MAD, and currently going to "
                + 'intern with RetailMeNot over the summer.'}
                contrib={{...stats('DrewRomanyk'), tests: 0}}
            />
            <TeamMember
                name='Cameron Piel'
                image='cameron.jpg'
                role='Database & Backend'
                about={'My name is Cameron Piel, I am a 5th year student here at '
                + 'UT. When I am not coding or cooking you can find me sitting '
                + 'at my desk pretending to be productive.'}
                contrib={{...stats('Cpiely'), tests: 15}}
            />
            <TeamMember
                image='rperce.jpg'
                name='Robert Perce'
                role='Frontend & Devops'
                about={'Fourth-year Computer Science and Mathematics student at UT '
                + "Austin. I'll be starting full-time at Indeed in July!"}
                contrib={{...stats('rperce'), tests: 0}}
            />
            <TeamMember
                image='mpark.jpg'
                name='Melody Park'
                role='Frontend & API'
                about={'Fourth year UT student who likes to get swole. Weenie on '
                + 'the outside. Dragon on the inside.'}
                contrib={{...stats('myopark'), tests: 0}}
            />
            <TeamMember
                image='thomasp.jpg'
                name='Thomas Potnuru'
                role='Project 1 API Documentation'
                about={"Currently a senior at UT Austin doing my Bachelor's in "
                + 'Computer Sceince. I am a IEEE Computer Society Officer '
                + 'again this year! Usually making and eating dessert in my '
                + ' free time.'}
                contrib={{...stats('thomas-potnuru'), tests: 0}}
            />
        </Row>
    );
};
TheGlamFam.propTypes = {
    stats: PropTypes.array.isRequired, // TODO lazy
};

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit_test_desc: 'Running unit tests...',
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
                    </GridCell>
                </Row>
                <TheGlamFam stats={this.state.stats.contributors}/>
                <Row>
                    <GridCell lg={4}>
                        <PageHeader>Stats</PageHeader>
                        <ul>
                            <li>
                                <Badge>{totalStats.commits}</Badge> commits (excluding merge commits)
                            </li>
                            <li><Badge>{totalStats.issues}</Badge> issues</li>
                            <li><Badge>15</Badge> unit tests</li>
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
                        <li><a href="https://www.microsoft.com/cognitive-services/en-us/bing-image-search-api">Bing
                            Image Search API</a>
                            - used to collect images for Brands.
                        </li>
                        <li><a href="https://developer.github.com/v3/">Github API</a>
                            - used to collect Github Repo statistics and information to display on the About page.
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
                    <GridCell lg={6}>
                        <PageHeader>Technical Report</PageHeader>
                        <a className="btn" href="/report">View Report</a>
                    </GridCell>
                    <GridCell lg={6}>
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
