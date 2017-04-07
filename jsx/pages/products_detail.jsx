/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React from 'react';
import { Container, Panel } from '../ui/Bootstrap.jsx';

export default class Products_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            product: {
                tags: [], brand: {name: ''}, image_url: '', name: '', price: '', rating: ''
            }
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/products/' + this.id)
            .then((data) => {
                this.setState({product: data});
            });
    }

    render() {
        const tags = this.state.product.tags.map(item => {
            return (
                <span key={item.id} className="label label-primary">
                    <a href={'/tags/' + item.id}>{item.name}</a>
                </span>
            );
        });
        return (
			<Container>
				<Panel.Panel>
					<Panel.Heading>
                        <h1 className="panel-title">{this.state.product.name}</h1>
					</Panel.Heading>
					<Panel.Body>
                        <img className="img-thumbnail" src={this.state.product.image_url}/>
                        <h5>Price: </h5>
                        <p>{Number(this.state.product.price).toFixed(2)}</p>
                        <h5>Rating: </h5>
                        <p>{Number(this.state.product.rating).toFixed(2)}</p>
                        <h5>Brand: </h5>
                        <p><a href={'/brands/' + this.state.product.brand_id}>{this.state.product.brand.name}</a></p>
                        <h5>Tags: </h5>
                        <div className="thumbnail horizontal-container">
                            {tags}
                        </div>
					</Panel.Body>
				</Panel.Panel>
			</Container>
        );
    }
}
