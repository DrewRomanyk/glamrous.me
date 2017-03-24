import React from 'react';
import FilterBar from '../ui/FilterBar.jsx';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/products')
            .then((data) => {
                this.setState({products: data});
            });
    }

    render() {
        const products = this.state.products.map((item, i) => {
            return (

                <div key={item.id} className="item  col-xs-4 col-lg-4">
                    <div className="thumbnail">
                        <img className="group list-group-image" src={item.image_url} alt=""/>
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
                            <p className="group inner list-group-item-text">{item.description}</p>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <p className="lead">Brand: {item.brand.name}</p>
                                    <p className="lead">Price: {item.price}</p>
                                    <p className="lead">Rating: {item.rating}</p>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <a className="btn" href={"/products/" + item.id}>View Product</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
				<FilterBar />
                <div id="products" className="row list-group">
                    { products }
                </div>
            </div>
        );
    }
}
