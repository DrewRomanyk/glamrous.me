/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React from 'react';
import { Caption, GridCell, Row, Thumbnail } from '../ui/Bootstrap.jsx';
import SortFilterPaginate, { FILTER_TYPE } from '../ui/SortFilterPaginate.jsx';
import ClimbingBoxLoader from '../ui/ClimbingBoxLoader.jsx';
import Block from 'jsxstyle/Block';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
			loaded: false,
			products: []
		};
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/products')
            .then((data) => {
				this.setState({
					loaded: true,
					products: data
				});
            });
    }

    render() {
		if (!this.state.loaded) {
			return (
				<ClimbingBoxLoader />
			);
		}
        const productObjs = this.state.products.map(item => ({
			filterables: [
				{	name: 'Brand',
					type: FILTER_TYPE.SELECTABLE,
					value: [item.brand.name],
				},
				{	name: 'Tag',
					type: FILTER_TYPE.SELECTABLE,
					value: item.tags.map(tagObj => tagObj.name),
				},
				{	name: 'Color',
					type: FILTER_TYPE.SELECTABLE,
					value: item.colors.map(colorObj => colorObj.name.trim()),
				},
				{	name: 'Price',
					type: FILTER_TYPE.RANGE,
					value: item.price,
				},
				{	name: 'Rating',
					type: FILTER_TYPE.RANGE,
					value: item.rating,
				},
			],
			sortables: [
				{	name: 'Name',
					sort: item.name,
				},
				{	name: 'Price',
					sort: item.price,
				},
				{	name: 'Rating',
					sort: item.rating,
				},
			],
			display: () => (
                <div key={item.id} className="item  col-xs-6 col-lg-4">
					<Thumbnail>
                        <Block className="card-img center-cropped"
                             backgroundImage={'url(' + item.image_url + ' )'} />
						 <Caption>
                            <h4 className="two-max-lines group inner list-group-item-heading">{item.name}</h4>
                            <p className="group inner list-group-item-text max-lines card-detail">{item.description}</p>
							<Row>
								<GridCell xs={12} md={12}>
                                    <p className="card-detail">Brand: {item.brand.name}</p>
                                    <p className="card-detail">Price: {Number(item.price).toFixed(2)}</p>
                                    <p className="card-detail">Rating: {Number(item.rating).toFixed(2)}</p>
                                    <a className="card-btn btn" href={'/products/' + item.id}>View</a>
								</GridCell>
							</Row>
						</Caption>
					</Thumbnail>
                </div>
            ),
        }));
        return (
			<SortFilterPaginate data={productObjs} />
        );
    }
}
