/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React from 'react';
import { Caption, Container, GridCell, Row } from '../ui/Bootstrap.jsx';

// Credit: Use http://bootsnipp.com/snippets/featured/list-grid-view as a html template

export default class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {brands: []};
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/brands')
            .then((data) => {
                this.setState({brands: data});
            });
    }

    render() {
        const brands = this.state.brands.map(item => {
            return (
                <div key={item.id} className="item  col-xs-6 col-lg-4">
                    <div className="card thumbnail">
                        <div className="card-img center-cropped"
                             style={{backgroundImage: 'url(' + item.image_url + ' )'}}/>
						<Caption>
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
							<Row>
                                <GridCell xs={12} md={12}>
                                    <p className="card-detail">Products: {item.num_products}</p>
                                    <p className="card-detail">Average Price: {Number(item.avg_price).toFixed(2)}</p>
                                    <p className="card-detail">Average Rating: {Number(item.avg_rating).toFixed(2)}</p>
                                    <a className="card-btn btn" href={'/brands/' + item.id}>View</a>
								</GridCell>
							</Row>
						</Caption>
                    </div>
                </div>
            );
        });
        return (
			<Container>
				<div id="brands" className="row list-group">
					{ brands }
				</div>
			</Container>
        );
    }
}
