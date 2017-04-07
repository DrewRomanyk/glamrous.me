/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React from 'react';
import { Caption, GridCell, Row } from '../ui/Bootstrap.jsx';
import SortFilterPaginate, { FILTER_TYPE } from '../ui/SortFilterPaginate.jsx';
import Block from 'jsxstyle/Block';

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
        const brandObjs = this.state.brands.map(item => ({
			filterables: [
				{	name: 'Category',
					type: FILTER_TYPE.SELECTABLE,
					value: item.categories.map(obj => obj.name)
				},
				{	name: 'Tags',
					type: FILTER_TYPE.SELECTABLE,
					value: item.tags.map(obj => obj.name)
				},
			],
			sortables: [
				{	name: 'Name',
					sort: item.name,
				},
				{	name: 'Price',
					sort: item.avg_price,
				},
				{	name: 'Rating',
					sort: item.avg_rating,
				},
			],
			display: () => (
                <div key={item.id} className="item  col-xs-6 col-lg-4">
                    <div className="card thumbnail">
                        <Block className="card-img center-cropped"
                             backgroundImage={'url(' + item.image_url + ' )'} />
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
            )
        }));
        return (
			<SortFilterPaginate data={brandObjs} />
        );
    }
}
