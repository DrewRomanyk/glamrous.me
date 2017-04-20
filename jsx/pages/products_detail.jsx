/*global $*/ //tells ESLint that $ is a global object and is fine to use undefined
import React, {PropTypes} from 'react';
import {Container, Panel} from '../ui/Bootstrap.jsx';
import ClimbingBoxLoader from '../ui/ClimbingBoxLoader.jsx';
import InlineBlock from 'jsxstyle/InlineBlock';

export default class Products_Details extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            loaded: false,
            product: {
                description: '',
                tags: [],
                brand: {
                    id: 0,
                    name: ''
                },
                category: {
                    id: 0,
                    name: ''
                },
                image_url: '',
                name: '',
                price: '',
                rating: ''
            }
        };
    }

    componentDidMount() {
        $.getJSON(document.location.origin + '/api/products/' + this.id)
            .then((data) => {
                this.setState({loaded: true, product: data});
            });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <ClimbingBoxLoader />
            );
        }
        const tags = this.state.product.tags.map(item => {
            return (
                <span key={item.id} className="label label-primary">
                    <a href={'/tags/' + item.id}>{item.name}</a>
                </span>
            );
        });
        const colors = this.state.product.colors.map(item => {
            return (
                <InlineBlock key={item.id} className="label" backgroundColor={item.hashcode}>
                    {item.name}
                </InlineBlock>
            );
        });
        let sub_category_data = (<p>No sub categories here!</p>);
        if (this.state.product.sub_category !== undefined) {
            sub_category_data = (
                <span key={this.state.product.sub_category.id} className="label label-primary">
                    <a href={'/sub_categories/' + this.state.product.sub_category.id}>{this.state.product.sub_category.name}</a>
                </span>
            );
        }
        return (
            <Container>
                <Panel.Panel>
                    <Panel.Heading>
                        <h1 className="panel-title">{this.state.product.name}</h1>
                    </Panel.Heading>
                    <Panel.Body>
                        <img className="img-thumbnail" src={this.state.product.image_url}/>
                        <h5>Description: </h5>
                        <p>{this.state.product.description}</p>
                        <h5>Price: </h5>
                        <p>{Number(this.state.product.price).toFixed(2)}</p>
                        <h5>Rating: </h5>
                        <p>{Number(this.state.product.rating).toFixed(2)}</p>
                        <h5>Brand: </h5>
                        <p><a href={'/brands/' + this.state.product.brand_id}>{this.state.product.brand.name}</a></p>
                        <h5>Colors: </h5>
                        <div className="thumbnail horizontal-container">
                            {colors}
                        </div>
                        <h5>Tags: </h5>
                        <div className="thumbnail horizontal-container">
                            {tags}
                        </div>
                        <h5>Category: </h5>
                        <span key={this.state.product.category.id} className="label label-primary">
                            <a href={'/categories/' + this.state.product.category.id}>{this.state.product.category.name}</a>
                        </span>
                        <h5>Sub Category: </h5>
                        {sub_category_data}
                    </Panel.Body>
                </Panel.Panel>
            </Container>
        );
    }
}
Products_Details.propTypes = {
    id: PropTypes.string.isRequired,
};
