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
                <span key={item.id} className="label label-primary">
                    <a href={"/products/" + item.id}>{item.name}</a>
                </span>
            );
        });
        const tags = this.state.brand.tags.map((item, i) => {
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
                        <h1 className="panel-title">{this.state.brand.name}</h1>
                    </div>
                    <div className="panel-body">
                        <img className="img-thumbnail" src={this.state.brand.image_url}/>
                        <h5>Average price: </h5>
                        <p>{Number(this.state.brand.avg_price).toFixed(2)}</p>
                        <h5>Average rating: </h5>
                        <p>{Number(this.state.brand.avg_rating).toFixed(2)}</p>
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