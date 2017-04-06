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

                <div key={item.id} className="item  col-xs-6 col-lg-4">
                    <div className="thumbnail">
                        <div className="card-img center-cropped"
                             style={{backgroundImage: 'url(' + item.image_url + ' )'}}/>
                        <div className="caption">
                            <h4 className="two-max-lines group inner list-group-item-heading">{item.name}</h4>
                            <p className="group inner list-group-item-text max-lines card-detail">{item.description}</p>
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <p className="card-detail">Brand: {item.brand.name}</p>
                                    <p className="card-detail">Price: {item.price}</p>
                                    <p className="card-detail">Rating: {item.rating}</p>
                                    <a className="card-btn btn" href={"/products/" + item.id}>View</a>
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
