import React from 'react';
import FilterBar from '../ui/FilterBar.jsx';

// Credit: Use http://bootsnipp.com/snippets/featured/list-grid-view as a html template

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
                <div key={item.id} className="item  col-xs-6 col-lg-4">
                    <div className="card thumbnail">
                        <div className="card-img center-cropped"
                             style={{backgroundImage: 'url(' + item.image_url + ' )'}}/>
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <p className="card-detail">Products: {item.num_products}</p>
                                    <p className="card-detail">Average Price: {Number(item.avg_price).toFixed(2)}</p>
                                    <p className="card-detail">Average Rating: {Number(item.avg_rating).toFixed(2)}</p>
                                    <a className="card-btn btn" href={"/brands/" + item.id}>View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div className="container">
                    <FilterBar />
                    <div id="brands" className="row list-group">
                        { brands }
                    </div>
                </div>
            </div>
        );
    }
}
