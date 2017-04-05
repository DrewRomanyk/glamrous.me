import React from 'react';

export default class Products_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            product: {
                tags: [], brand: {name: ''}, image_url: '', name: '', price: '', rating: ''
            }
        }
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/products/' + this.id)
            .then((data) => {
                this.setState({product: data});
            });
    }

    render() {
        const tags = this.state.product.tags.map((item, i) => {
            return (
                <span key={item.id} className="label label-primary">
                    <a href={"/tags/" + item.id}>{item.name}</a>
                </span>
            );
        });
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1 className="panel-title">{this.state.product.name}</h1>
                    </div>
                    <div className="panel-body">
                        <img src={this.state.product.image_url}/>
                        <h5>Price: </h5>
                        <p>{this.state.product.price}</p>
                        <h5>Rating: </h5>
                        <p>{this.state.product.rating}</p>
                        <h5>Brand: </h5>
                        <p><a href={'/brands/' + this.state.product.brand_id}>{this.state.product.brand.name}</a></p>
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