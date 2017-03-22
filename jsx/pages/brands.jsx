import React from 'react';

export default class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {brands: []}
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/brands')
            .then((data) => {
                this.setState({brands: data});
            });
    }

    render() {
        const brands = this.state.brands.map((item, i) => {
            return (
                <tr key={item.id}>
                    <td><a href={"/brands/" + item.id}>{item.name}</a></td>
                    <td>{item.avg_price}</td>
                    <td>{item.avg_rating}</td>
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
                            <th>Avg Price</th>
                            <th>Avg Rating</th>
                        </tr>
                        </thead>
                        <tbody>
                        { brands }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
