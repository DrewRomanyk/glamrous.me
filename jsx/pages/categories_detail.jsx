/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React, { PropTypes } from 'react';

export default class Categories_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            category: {
                products: [], brands: [], name: '', avg_price: '', avg_rating: ''
            }
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/categories/' + this.id)
            .then((data) => {
                this.setState({category: data});
            });
    }

    render() {
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
                    </div>
                </div>
            </div>
        );
    }
}
Categories_Details.propTypes = {
	id: PropTypes.string.isRequired,
};
