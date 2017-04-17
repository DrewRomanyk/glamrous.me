import React, { Component, PropTypes } from 'react';
import flatten from 'lodash/flatten';
import zip from 'lodash/zip';
import Flex from 'jsxstyle/Flex';
import Inline from 'jsxstyle/Inline';

class SortOptions extends Component {
	constructor(props) {
		super(props);

		this.setSortBy = (name, reverse) => {
			return (event) => {
				event.stopPropagation();
				this.props.setSortBy(name, reverse);
				return false;
			};
		};
	}

	render() {
		const sorts = flatten(zip(
			this.props.sortOptions.map(x => ({sort: x, reverse: false})),
			this.props.sortOptions.map(x => ({sort: x, reverse: true}))
		));
		const dropdownItem = (sortOpt) => {
			const rev  = sortOpt.reverse;
			const name = sortOpt.sort + (rev ? ' (Reverse)' : '');
			return (
				<li key={name}>
					<a href='javascript:;' onClick={this.setSortBy(sortOpt.sort, rev)}>{name}</a>
				</li>
			);
		};
		return (
			<Flex>
				<Flex marginRight='5px' fontSize='large'>
					Sort By:
				</Flex>
				<div className='dropdown'>
					<button className='btn btn-default dropdown-toggle' type='button' id='sortByDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
						{this.props.current} <Inline className='caret' marginLeft='5px' marginBottom='4px' display='inline-block'/>
					</button>
					<ul className='dropdown-menu' aria-labelledby='sortByDropdown'>
						{sorts.map( sort => dropdownItem(sort) )}
					</ul>
				</div>
			</Flex>
		);
	}
}
SortOptions.propTypes = {
	setSortBy: PropTypes.func.isRequired,
	current: PropTypes.string.isRequired,
	sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default SortOptions;
