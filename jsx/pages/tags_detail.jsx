import React from 'react';

export default class Tags_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {tag: {name: '', avg_price: '', avg_rating: ''}}
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/tags/' + this.id)
            .then((data) => {
                this.setState({tag: data});
            });
    }

    render() {
        // const products = this.state.brand.products.map((item, i) => {
        //     return (
        //         <div key={item.id}>
        //             <a href={"/products/" + item.id}><h4>{item.name}</h4></a>
        //         </div>
        //     );
        // });
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
                        <h5>Products: </h5>
                        {/*<p>{products}</p>*/}
                        <h5>Brands: </h5>
                    </div>
                </div>
            </div>
        );
    }
}