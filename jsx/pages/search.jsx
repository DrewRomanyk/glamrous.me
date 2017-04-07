/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React, { PropTypes } from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.search = props.id;
        this.state = {
            data: ''
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/search/' + this.search)
            .then((data) => {
                this.setState({data: data});
            });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <p>{JSON.stringify(this.state.data)}</p>
                </div>
            </div>
        );
    }
}
Search.propTypes = {
    id: PropTypes.string.isRequired,
};
