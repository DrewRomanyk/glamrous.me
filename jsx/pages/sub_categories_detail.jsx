/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React, {PropTypes} from 'react';
import ClimbingBoxLoader from '../ui/ClimbingBoxLoader.jsx';

export default class Sub_Categories_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            loaded: false,
            sub_category: {
                id: 0,
                products: [],
                brands: [],
                tags: [],
                name: '',
                num_products: 0,
                category: {
                    id: 0,
                    name: ''
                },
                avg_price: '',
                avg_rating: ''
            }
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/sub_categories/' + this.id)
            .then((data) => {
                this.setState({loaded: true, sub_category: data});
            });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <ClimbingBoxLoader />
            );
        }
        const brands = this.state.sub_category.brands.map(item => {
            return (
                <span key={item.id} className='label label-primary'>
                    <a href={'/tags/' + item.id}>{item.name}</a>
                </span>
            );
        });
        const products = this.state.sub_category.products.map(item => {
            return (
                <span key={item.id} className='label label-primary'>
                    <a href={'/products/' + item.id}>{item.name}</a>
                </span>
            );
        });
        const tags = this.state.sub_category.tags.map(item => {
            return (
                <span key={item.id} className='label label-primary'>
                    <a href={'/tags/' + item.id}>{item.name}</a>
                </span>
            );
        });
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1 className="panel-title">{this.state.sub_category.name}</h1>
                    </div>
                    <div className="panel-body">
                        <h5>Average price: </h5>
                        <p>{Number(this.state.sub_category.avg_price).toFixed(2)}</p>
                        <h5>Average rating: </h5>
                        <p>{Number(this.state.sub_category.avg_rating).toFixed(2)}</p>
                        <h5>Category: </h5>
                        <span key={this.state.sub_category.category.id} className='label label-primary'>
                            <a href={'/categories/' + this.state.sub_category.category.id}>{this.state.sub_category.category.name}</a>
                        </span>
                        <h5>Brands: </h5>
                        <div className="thumbnail horizontal-container">
                            {brands}
                        </div>
                        <h5>Products: </h5>
                        <div className="thumbnail horizontal-container">
                            {products}
                        </div>
                        <h5>Tags: </h5>
                        <div className="thumbnail horizontal-container">
                            {tags}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Sub_Categories_Details.propTypes = {
    id: PropTypes.string.isRequired,
};
