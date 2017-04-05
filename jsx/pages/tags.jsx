import React from 'react';
import FilterBar from '../ui/FilterBar.jsx';

// Credit: Use http://bootsnipp.com/snippets/featured/list-grid-view as a html template

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tags: []}
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/tags')
            .then((data) => {
                this.setState({tags: data});
            });
    }

    render() {
        const tags = this.state.tags.map((item, i) => {
            return (

                <div key={item.id} className="item  col-xs-4 col-lg-4">
                    <div className="thumbnail">
                        {/*<img className="group list-group-image" src={item.image_url} alt=""/>*/}
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <p className="card-detail">Products: {item.num_products}</p>
                                    <p className="card-detail">Average Price: {item.avg_price}</p>
                                    <p className="card-detail">Average Rating: {item.avg_rating}</p>
                                    <a className="card-btn btn" href={"/tags/" + item.id}>View Tag</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
                <FilterBar />
                <div id="tags" className="row list-group">
                    { tags }
                </div>
            </div>
        );
    }
}
