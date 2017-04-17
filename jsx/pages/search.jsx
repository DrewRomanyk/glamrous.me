/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React, {PropTypes} from 'react';
import {Caption, Thumbnail, Container} from '../ui/Bootstrap.jsx';
import SortFilterPaginate from '../ui/SortFilterPaginate.jsx';
import ClimbingBoxLoader from '../ui/ClimbingBoxLoader.jsx';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.search = props.id;
        this.state = {
            loaded: false,
            data: {
                and_results: [],
                keywords: [],
                or_results: []
            }
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/search/' + this.search)
            .then((data) => {
                this.setState({
                    loaded: true,
                    data: data
                });
            });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <ClimbingBoxLoader />
            );
        }
        let and_text = this.state.data.keywords.reduce(function (acc, val) {
            return (acc + ' AND ' + val);
        });
        const and_objs = this.state.data.and_results.map(item => ({
            filterables: [],
            sortables: [],
            display: () => (
                <div key={item.type + item.id} className="item col-xs-6 col-lg-4">
                    <Thumbnail>
                        <Caption>
                            <h4 className="two-max-lines group inner list-group-item-heading">{item.name}</h4>
                            <p className="one-line card-detail">{item.type}</p>
                            <p className="one-line card-detail">{item.id}</p>
                            <p className="three-max-lines card-detail"
                               dangerouslySetInnerHTML={{__html: item.context}}/>
                            <a className="card-btn btn" href={item.url_type + item.id}>View</a>
                        </Caption>
                    </Thumbnail>
                </div>
            ),
        }));
        let or_search_results = (<div></div>);
        if (this.state.data.keywords.length > 1) {
            let or_text = this.state.data.keywords.reduce(function (acc, val) {
                return (acc + ' OR ' + val);
            });
            const or_objs = this.state.data.or_results.map(item => ({
                filterables: [],
                sortables: [],
                display: () => (
                    <div key={item.type + item.id} className="item col-xs-6 col-lg-4">
                        <Thumbnail>
                            <Caption>
                                <h4 className="two-max-lines group inner list-group-item-heading">{item.name}</h4>
                                <p className="one-line card-detail">{item.type}</p>
                                <p className="one-line card-detail">{item.id}</p>
                                <p className="three-max-lines card-detail"
                                   dangerouslySetInnerHTML={{__html: item.context}}/>
                                <a className="card-btn btn" href={item.url_type + item.id}>View</a>
                            </Caption>
                        </Thumbnail>
                    </div>
                ),
            }));
            or_search_results = (
                <div>
                    <h1>Search results for "{or_text}"</h1>
                    <SortFilterPaginate per_page="10" remove_bar='true' data={or_objs}/>
                </div>
            );
        }

        return (
            <Container>
                <h1>Search results for "{and_text}"</h1>
                <SortFilterPaginate per_page="10" remove_bar='true' data={and_objs}/>
                {or_search_results}
            </Container>
        );
    }
}
Search.propTypes = {
    id: PropTypes.string.isRequired,
};
