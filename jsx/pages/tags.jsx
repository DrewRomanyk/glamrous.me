/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React from 'react';
import { Caption, GridCell, Row, Thumbnail } from '../ui/Bootstrap.jsx';
import SortFilterPaginate, { FILTER_TYPE } from '../ui/SortFilterPaginate.jsx';

// Credit: Use http://bootsnipp.com/snippets/featured/list-grid-view as a html template

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        };
    }

    componentDidMount() {
        this.loadTags();
    }

    loadTags() {
        $.ajax({
            url: document.location.origin + '/api/tags',
            data: {},
            dataType: 'json',
            type: 'GET',

            success: data => {
				this.setState({ tags: data, });
            },

            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    render() {
        const tagObjs = this.state.tags.map(item => ({
			filterables: [
				{	name: 'Brand',
					type: FILTER_TYPE.SELECTABLE,
					value: item.brands.map(brandObj => brandObj.name),
				},
				{	name: 'Average Price',
					type: FILTER_TYPE.RANGE,
					value: item.avg_price,
				},
				{	name: 'Average Rating',
					type: FILTER_TYPE.RANGE,
					value: item.avg_rating,
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
					<Thumbnail>
						<Caption>
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
							<Row>
								<GridCell xs={12} md={12}>
                                    <p className="card-detail">Products: {item.num_products}</p>
                                    <p className="card-detail">Average Price: {Number(item.avg_price).toFixed(2)}</p>
                                    <p className="card-detail">Average Rating: {Number(item.avg_rating).toFixed(2)}</p>
                                    <a className="card-btn btn" href={'/tags/' + item.id}>View</a>
								</GridCell>
							</Row>
						</Caption>
					</Thumbnail>
                </div>
			),
		}));
        return (
			<SortFilterPaginate data={tagObjs} />
        );
    }
}
