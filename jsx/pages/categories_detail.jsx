/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React, {PropTypes} from 'react';
import ClimbingBoxLoader from '../ui/ClimbingBoxLoader.jsx';

export default class Categories_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            loaded: false,
            category: {
                products: [],
                brands: [],
                sub_categories: [],
                name: '',
                avg_price: '',
                avg_rating: ''
            }
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/categories/' + this.id)
            .then((data) => {
                this.setState({loaded: true, category: data});
            });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <ClimbingBoxLoader />
            );
        }
        const brands = this.state.category.brands.map(item => {
            return (
                <span key={item.id} className='label label-primary'>
                    <a href={'/tags/' + item.id}>{item.name}</a>
                </span>
            );
        });
        const products = this.state.category.products.map(item => {
            return (
                <span key={item.id} className='label label-primary'>
                    <a href={'/products/' + item.id}>{item.name}</a>
                </span>
            );
        });
        const sub_categories = this.state.category.sub_categories.map(item => {
            return (
                <span key={item.id} className='label label-primary'>
                    <a href={'/sub_categories/' + item.id}>{item.name}</a>
                </span>
            );
        });
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1 className="panel-title">{this.state.category.name}</h1>
                    </div>
                    <div className="panel-body">
                        <h5>Average price: </h5>
                        <p>{Number(this.state.category.avg_price).toFixed(2)}</p>
                        <h5>Average rating: </h5>
                        <p>{Number(this.state.category.avg_rating).toFixed(2)}</p>
                        <h5>Brands: </h5>
                        <div className="thumbnail horizontal-container">
                            {brands}
                        </div>
                        <h5>Products: </h5>
                        <div className="thumbnail horizontal-container">
                            {products}
                        </div>
                        <h5>Sub Categories: </h5>
                        <div className="thumbnail horizontal-container">
                            {sub_categories}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Categories_Details.propTypes = {
    id: PropTypes.string.isRequired,
};
