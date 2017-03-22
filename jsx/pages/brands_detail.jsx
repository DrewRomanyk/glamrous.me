import React from 'react';

export default class Brands_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {brand: {name: '', avg_price: ''}}
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/brands/' + this.id)
            .then((data) => {
                this.setState({brand: data});
            });
    }

    render() {
        const brand = (
            <div>
                <h1>{this.state.brand.name}</h1>
                <p>{this.state.brand.avg_price}</p>
            </div>
        );
        return (
            <div>{ brand }</div>
        );
    }
}