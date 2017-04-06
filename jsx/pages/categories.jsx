import React from 'react';

// Credit: Use http://bootsnipp.com/snippets/featured/list-grid-view as a html template

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {categories: []}
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/categories')
            .then((data) => {
                this.setState({categories: data});
            });
    }

    render() {
        const categories = this.state.categories.map((item, i) => {
            return (

                <div key={item.id} className="item  col-xs-6 col-lg-4">
                    <div className="thumbnail">
                        {/*<img className="group list-group-image" src={item.image_url} alt=""/>*/}
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <p className="card-detail">Products: {item.num_products}</p>
                                    <p className="card-detail">Average Price: {Number(item.avg_price).toFixed(2)}</p>
                                    <p className="card-detail">Average Rating: {Number(item.avg_rating).toFixed(2)}</p>
                                    <a className="card-btn btn" href={"/categories/" + item.id}>View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
                <div id="categories" className="row list-group">
                    { categories }
                </div>
            </div>
        );
    }
}
