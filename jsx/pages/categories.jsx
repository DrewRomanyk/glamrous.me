/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React from 'react';
import {Caption, GridCell, Row, Thumbnail} from '../ui/Bootstrap.jsx';
import ClimbingBoxLoader from '../ui/ClimbingBoxLoader.jsx';
import SortFilterPaginate, {FILTER_TYPE} from '../ui/SortFilterPaginate.jsx';

// Credit: Use http://bootsnipp.com/snippets/featured/list-grid-view as a html template

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            categories: []
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/categories')
            .then((data) => {
                this.setState({
                    loaded: true,
                    categories: data
                });
            });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <ClimbingBoxLoader />
            );
        }
        const categoryObjs = this.state.categories.map(item => ({
            filterables: [
                {
                    name: 'Brand',
                    type: FILTER_TYPE.SELECTABLE,
                    value: item.brands.map(tagObj => tagObj.name),
                },
                {
                    name: 'Average Price',
                    type: FILTER_TYPE.RANGE,
                    value: item.avg_price,
                },
                {
                    name: 'Average Rating',
                    type: FILTER_TYPE.RANGE,
                    value: item.avg_rating,
                },
            ],
            sortables: [
                {
                    name: 'Name',
                    sort: item.name,
                },
                {
                    name: 'Price',
                    sort: item.avg_price,
                },
                {
                    name: 'Rating',
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
                                    <a className="card-btn btn" href={'/categories/' + item.id}>View</a>
                                </GridCell>
                            </Row>
                        </Caption>
                    </Thumbnail>
                </div>
            ),
        }));
        return (
            <SortFilterPaginate data={categoryObjs}/>
        );
    }
}
