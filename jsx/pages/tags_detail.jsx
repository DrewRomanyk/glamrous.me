import React from 'react';

export default class Tags_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            tag: {
                brands: [], products: [], name: '', avg_price: '', avg_rating: ''
            }
        }
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/tags/' + this.id)
            .then((data) => {
                this.setState({tag: data});
            });
    }

    render() {
        const brands = this.state.tag.brands.map((item, i) => {
            return (
                <span key={item.id} className="label label-primary">
                    <a href={"/tags/" + item.id}>{item.name}</a>
                </span>
            );
        });
        const products = this.state.tag.products.map((item, i) => {
            return (
                <span key={item.id} className="label label-primary">
                    <a href={"/products/" + item.id}>{item.name}</a>
                </span>
            );
        });
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h1 className="panel-title">{this.state.tag.name}</h1>
                    </div>
                    <div className="panel-body">
                        <h5>Average price: </h5>
                        <p>{this.state.tag.avg_price}</p>
                        <h5>Average rating: </h5>
                        <p>{this.state.tag.avg_rating}</p>
                        <h5>Brands: </h5>
                        <div>
                            {brands}
                        </div>
                        <h5>Products: </h5>
                        <div>
                            {products}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}