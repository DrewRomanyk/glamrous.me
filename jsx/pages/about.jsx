import React from 'react';

const About = () => (
    <div className="container">

        <div className="row">
            <div className="col-lg-12">
                <h2 className="page-header">Meet The Glam Fam</h2>
                <p>Welcome to glamrous.me! This web app is a way to get access to all of your favorite cosmetics in one
                    quick glance.</p>
                <a href="/report1">Technical Report #1</a>
            </div>
            <br />
            <br />
            <br />
            <div className="col-lg-4 col-sm-6 text-center">
                <img className="img-circle img-responsive img-center" src="/static/img/about/thomas.jpg" alt=""/>
                <h3>Thomas Gaubert</h3>
                <h6>Devops</h6>
                <p>I'm an avid lover of the outdoors and the co-lead of Freetail Hackers. I'll be an intern at
                    Microsoft this summer.</p>
                <p>Number of commits: ##</p>
                <p>Number of issues: ##</p>
                <p>Number of unit tests: ##</p>
            </div>
            <div className="col-lg-4 col-sm-6 text-center">
                <img className="img-circle img-responsive img-center" src="/static/img/about/drew.jpg" alt=""/>
                <h3>Drew Romanyk</h3>
                <h6>Frontend & Backend</h6>
                <p>I'm currently a junior computer science student at The University of Texas at Austin. I'm the
                    president of MAD, and currently going to intern with RetailMeNot over the summer.</p>
                <p>Number of commits: ##</p>
                <p>Number of issues: ##</p>
                <p>Number of unit tests: ##</p>
            </div>
            <div className="col-lg-4 col-sm-6 text-center">
                <img className="img-circle img-responsive img-center" src="/static/img/about/cameron.jpg" alt=""/>
                <h3>Cameron Piel</h3>
                <h6>Database & Backend</h6>
                <p>My name is Cameron Piel, I am a 5th year student here at UT. When I am not coding or cooking you can
                    find me sitting at my desk pretending to be productive.</p>
                <p>Number of commits: ##</p>
                <p>Number of issues: ##</p>
                <p>Number of unit tests: ##</p>
            </div>
            <div className="col-lg-4 col-sm-6 text-center">
                <img className="img-circle img-responsive img-center" src="static/img/about/rperce.jpg" alt="Robert Perce"/>
                <h3>Robert Perce</h3>
                <h6>Frontend & Devops</h6>
                <p>Fourth-year Computer Science and Mathematics student at UT Austin. I'll be starting full-time at
                   Indeed in July!</p>
                <p>Number of commits: ##</p>
                <p>Number of issues: ##</p>
                <p>Number of unit tests: ##</p>
            </div>
            <div className="col-lg-4 col-sm-6 text-center">
				<img className="img-circle img-responsive img-center" src="static/img/about/mpark.jpg" alt="Melody Park, get it, hahahaha"/>
                <h3>Melody Park</h3>
                <h6>Frontend & Backend</h6>
                <p>What does this team member do? Keep it short! This is also a great spot for social links!</p>
                <p>Number of commits: ##</p>
                <p>Number of issues: ##</p>
                <p>Number of unit tests: ##</p>
            </div>
            <div className="col-lg-4 col-sm-6 text-center">
                <img className="img-circle img-responsive img-center" src="/static/img/about/thomasp.jpg" alt=""/>
                <h3>Thomas Potnuru</h3>
                <h6>API & Backend</h6>
                <p>Currently a senior at UT Austin doing my Bachelor's in Computer Sceince. I am a IEEE Computer Society Officer again this year! Usually making and eating dessert in my free time. </p>
                <p>Number of commits: ##</p>
                <p>Number of issues: ##</p>
                <p>Number of unit tests: ##</p>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-4">
                <h1 className="page-header">Stats</h1>
                <ul>
                    <li>Number of commits: ##</li>
                    <li>Number of issues: ##</li>
                    <li>Number of unit tests: ##</li>
                    <li><a href="http://docs.glamrousme.apiary.io/#">Apiary API</a></li>
                    <li><a href="https://github.com/DrewRomanyk/glamrous.me/issues">Github Issue Tracker</a></li>
                    <li><a href="https://github.com/DrewRomanyk/glamrous.me">Github Repo</a></li>
                </ul>
            </div>
            <div className="col-lg-4">
                <h1 className="page-header">Data</h1>
                <li><a href="http://makeup-api.herokuapp.com/">Makeup API</a> - used to collect all the information
                    about each cosmetics brand, product, and details
                    about those objects.
                </li>
            </div>
            <div className="col-lg-4">
                <h1 className="page-header">Tools</h1>
                <li>Bootstrap - Frontend framework to simplify building pages.</li>
                <li>React - Frontend engine to power all of our clientside rendering and routing.</li>
                <li>Flask - Python server engine to power all the api and forward all non-api routing to React.</li>
                <li>Slack - Group messaging to communicate effectively as a group.</li>
                <li>Github - A git repository hosting service.</li>
                <li>Apiary - An API documentation service.</li>
            </div>
        </div>
    </div>

);
export default About;
