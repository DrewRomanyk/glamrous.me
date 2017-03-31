import React from 'react';
import ReactPaginate from 'react-paginate';
import FilterBar from '../ui/FilterBar.jsx';

// Credit: Use http://bootsnipp.com/snippets/featured/list-grid-view as a html template

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            visible_tags: [],
            num_pages: 1,
            cur_page: 0,
            per_page: 1,
        }
    }

    componentDidMount() {
        this.loadTags();
    }

    getVisibleData(cur_page, data) {
        let visible_tags = [];
        var cur_i = cur_page * this.state.per_page;
        let end_i = cur_i + this.state.per_page;
        while (cur_i < end_i) {
            if (cur_i >= data.length) {
                break
            }
            visible_tags.push(data[cur_i]);
            cur_i++;
        }

        return visible_tags;
    }

    loadTags() {
        $.ajax({
            url: document.location.origin + '/api/tags',
            data: {},
            dataType: 'json',
            type: 'GET',

            success: data => {
                this.setState(
                    {
                        tags: data,
                        num_pages: Math.ceil(data.length / this.state.per_page),
                        visible_tags: this.getVisibleData(this.state.cur_page, data)
                    }
                );
            },

            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handlePageClick(data) {
        this.setState(
            {
                cur_page: data.selected,
                visible_tags: this.getVisibleData(data.selected, this.state.tags)
            }
        );
    }

    render() {
        const tags = this.state.visible_tags.map((item, i) => {
            return (
                <div key={item.id} className="item  col-xs-4 col-lg-4">
                    <div className="thumbnail">
                        <div className="caption">
                            <h4 className="group inner list-group-item-heading">{item.name}</h4>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <p className="lead">Products: {item.num_products}</p>
                                    <p className="lead">Average Price: {item.avg_price}</p>
                                    <p className="lead">Average Rating: {item.avg_rating}</p>
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <a className="btn" href={"/tags/" + item.id}>View Tag</a>
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
                <ReactPaginate previousLabel={"<"}
                               nextLabel={">"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.state.num_pages}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={(e) => this.handlePageClick(e)}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}/>
                <div id="tags" className="row list-group">
                    { tags }
                </div>
            </div>
        );
    }
}
