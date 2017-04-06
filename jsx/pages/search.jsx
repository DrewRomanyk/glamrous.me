import React from 'react';
import FilterBar from '../ui/FilterBar.jsx';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.search = props.id;
        this.state = {
            data: ''
        }
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
