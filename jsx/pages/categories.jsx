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

                <div key={item.id} className="item  col-xs-4 col-lg-4">
                    <div className="thumbnail">
                        {/*<img className="group list-group-image" src={item.image_url} alt=""/>*/}
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <p className="lead">Products: {item.num_products}</p>
                                    <p className="lead">Average Price: {item.avg_price}</p>
                                    <p className="lead">Average Rating: {item.avg_rating}</p>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <a className="btn" href={"/categories/" + item.id}>View Tag</a>
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
