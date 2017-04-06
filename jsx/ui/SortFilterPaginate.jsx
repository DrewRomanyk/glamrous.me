import React, { Component, PropTypes } from 'react';
import flatten from 'lodash/flatten';
import merge from 'lodash/merge';
import find from 'lodash/find';
import zip from 'lodash/zip';
import { Container } from '../ui/Bootstrap.jsx';
import Flex from 'jsxstyle/Flex';
import SortOptions from '../ui/SortOptions.jsx';
import FilterOptions from '../ui/FilterOptions.jsx';


class SortFilterPaginate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortBy: 'Name',
			allSorts: this.getAllSorts(props.data),
			selectedAttributes: {},
			selectedText: [],
		};

		this.setSortBy = this.setSortBy.bind(this);
		this.getAllSorts = this.getAllSorts.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({ allSorts: this.getAllSorts(props.data) });
	}

	getAllSorts(data) {
		let allSortMethods = new Set()
		data.forEach(datum => {
			datum.sortables.map(sortable => sortable.name).forEach(name => {
				allSortMethods.add(name);
			});
		});
		return allSortMethods;
	}

	setSortBy(sortBy, reverse) {
		this.setState({
			sortBy: sortBy,
			sortReverse: reverse,
		});
	}

	render() {
		const displayData = this.props.data.filter(element => {
			return true;
		}).sort((a, b) => {
			const fn = obj => obj.name === this.state.sortBy;
			const x = find(a.sortables, fn).sort;
			const y = find(b.sortables, fn).sort;

			if ( x < y )
				return this.state.sortReverse ? 1 : -1;
			if ( x > y )
				return this.state.sortReverse ? -1 : 1;
			return 0;
		});
		return (
			<Container>
				<div className='panel panel-default'>
					<Flex className='panel-body' alignItem='center'>
						<FilterOptions

						/>
						<Flex flex='1 1 auto' />
						<SortOptions
							sortOptions={[...this.state.allSorts]}
							current={this.state.sortBy}
							setSortBy={this.setSortBy}
						/>
					</Flex>
				</div>
				<div id="tags" className="row list-group">
					{displayData.map(element => element.display)}
				</div>
			</Container>
		);
	}

};
SortFilterPaginate.propTypes = {
	id: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.shape({
		display: PropTypes.element.isRequired, // anything directly renderable
		filterables: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				type: PropTypes.oneOf([0, 1]).isRequired,
				value: PropTypes.any.isRequired,
			}).isRequired
		).isRequired,
		sortables: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				sort: PropTypes.any.isRequired,
			}).isRequired
		).isRequired,
	}).isRequired).isRequired,
};

export default SortFilterPaginate;

export const FILTER_TYPE = {
	SELECTABLE: 0,
	RANGE: 1,
};
