import React from 'react';

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
                <tr key={item.id}>
                    <td><a href={"/products/" + item.id}>{item.name}</a></td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                </tr>
            );
        });
        return (
            <div className="container">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        { products }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
