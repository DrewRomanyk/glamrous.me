import React from 'react';

export default class Brands_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            brand: {
                tags: [], products: [], name: '', avg_price: '', image_url: '', avg_rating: ''
            }
        }
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/brands/' + this.id)
            .then((data) => {
                this.setState({brand: data});
            });
    }

    render() {
        const products = this.state.brand.products.map((item, i) => {
            return (
                <div key={item.id}>
                    <a href={"/products/" + item.id}>{item.name}</a>
                </div>
            );
        });
        const tags = this.state.brand.tags.map((item, i) => {
            return (
                <div key={item.id}>
                    <a href={"/tags/" + item.id}>{item.name}</a>
                </div>
            );
        });
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1 className="panel-title">{this.state.brand.name}</h1>
                    </div>
                    <div className="panel-body">
                        <img src={this.state.brand.image_url}/>
                        <h5>Average price: </h5>
                        <p>{this.state.brand.avg_price}</p>
                        <h5>Average rating: </h5>
                        <p>{this.state.brand.avg_rating}</p>
                        <h5>Products: </h5>
                        {products}
                        <h5>Tags: </h5>
                        {tags}
                    </div>
                </div>
            </div>
        );
    }
}