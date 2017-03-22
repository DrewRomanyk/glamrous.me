import React from 'react';

export default class Products_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {product: {name: '', price: '', rating: ''}}
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/products/' + this.id)
            .then((data) => {
                this.setState({product: data});
            });
    }

    render() {
        const product = (
            <div>
                <h1>{this.state.product.name}</h1>
                <p>{this.state.product.price}</p>
                <p>{this.state.product.rating}</p>
            </div>
        );
        return (
            <div>{ product }</div>
        );
    }
}