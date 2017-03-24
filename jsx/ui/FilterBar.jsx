import React, { Component } from 'react';

class SortByDropdown extends Component {
	constructor(props) {
		super(props);
		this.sortOptions = {
			name:    'Name (A–Z)',
			rname:   'Name (Z–A)',
			price:   'Price (Low–High)',
			rprice:  'Price (High–Low)',
			rating:  'Rating (Low–High)',
			rrating: 'Rating (High–Low)',
		};

		this.setSortBy = (name) => {
			return (event) => {
				event.stopPropagation();
				this.props.setSortBy(name);
				return false;
			}
		}
	}

	render() {
		const dropdownItem = (name) => (
			<li key={name}><a href='javascript:;' onClick={this.setSortBy(name)}>{this.sortOptions[name]}</a></li>
		);
		return (
			<div className='dropdown'>
				<button className='btn btn-default dropdown-toggle' type='button' id='sortByDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
					{this.sortOptions[this.props.current]} <span className='caret' style={{marginLeft: '5px'}}></span>
				</button>
				<ul className='dropdown-menu' aria-labelledby='sortByDropdown'>
					{Object.keys(this.sortOptions).map( key => dropdownItem(key) )}
				</ul>
			</div>
		);
	}
}

const SearchBox = () => {

	return (
		<div>
			<div className='searchBox'>
				<span className='icon'><i className='fa fa-search'></i></span>
				<input type='search' className='search' placeholder='Search' />
			</div>
		</div>
	);
}
export default class FilterBar extends Component {
	constructor(props) {
		super(props);
		this.state = {sortBy: 'name'};

		this.setSortBy = (method) => {
			this.setState({sortBy: method});
		}
	}

		render() {
		return (
			<div className='panel panel-default'>
				<div className='panel-body' style={{display: 'flex', alignItems: 'center'}}>
					<SearchBox />
					<div style={{display: 'flex', flex: '1 1 auto'}}></div>
					<div style={{marginRight: '5px', fontSize: 'large'}}>Sort By:</div>
					<SortByDropdown
						current={this.state.sortBy}
						setSortBy={this.setSortBy}
					/>
				</div>
			</div>
		);
	}
};
