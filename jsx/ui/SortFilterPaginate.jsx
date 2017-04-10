import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import find from 'lodash/find';
import { Container } from '../ui/Bootstrap.jsx';
import Flex from 'jsxstyle/Flex';
import SortOptions from '../ui/SortOptions.jsx';
import FilterOptions, { FILTER_TYPE } from '../ui/FilterOptions.jsx';

class SortFilterPaginate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortBy: 'Name',
			allSorts: this.getAllSorts(props.data),
			filters: this.getFilters(props.data),
			selectedAttributes: {},
			selectedText: [],

			per_page: this.props.perPage,
			offset: 0,
			page: 0,
		};

		this.setSortBy = this.setSortBy.bind(this);
		this.getAllSorts = this.getAllSorts.bind(this);
		this.toggleSelected = this.toggleSelected.bind(this);
		this.changeBounds = this.changeBounds.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			allSorts: this.getAllSorts(props.data),
			filters: this.getFilters(props.data),
		});
	}

	getAllSorts(data) {
		let allSortMethods = new Set();
		data.forEach(datum => {
			datum.sortables.map(sortable => sortable.name).forEach(name => {
				allSortMethods.add(name);
			});
		});
		return allSortMethods;
	}

	getFilters(data) {
		let allFilters = [];
		data.forEach(datum => {
			datum.filterables.forEach(filterable => {
				const filter_base = {name: filterable.name, type: filterable.type};
				let filter = find(allFilters, filter_base);
				if (filter === undefined) {
					allFilters.push(filter_base);
					filter = filter_base;
				}

				if (filterable.type === FILTER_TYPE.SELECTABLE) {
					filter.selectables = filter.selectables || [];
					if (Array.isArray(filterable.value)) {
						filterable.value.forEach(str => {
							const selectable = {name: str, selected: false};
							if (find(filter.selectables, selectable) === undefined) {
								filter.selectables.push(selectable);
							}
						});
					} else {
						console.warn('Error: if type is FILTER_TYPE.SELECTABLE, value must be array');
					}
				} else if (filterable.type === FILTER_TYPE.RANGE) {
					merge(filter, {min: -Infinity, max: Infinity});
				}
			});
		});
		return allFilters;
	}

	setSortBy(sortBy, reverse) {
		this.setState({
			sortBy: sortBy,
			sortReverse: reverse,
		});
	}

	toggleSelected(filterName, option) {
		// TODO immutable.js would be p cool
		const filters = cloneDeep(this.state.filters);
		const filter = find(filters, {name: filterName});
		const selectable = find(filter.selectables, {name: option});
		selectable.selected = !selectable.selected;
		this.setState({
			page: 0,
			offset: 0,
			filters: filters
		});
	}

	changeBounds(filterName, min, max) {
		const filters = cloneDeep(this.state.filters);
		const filter = find(filters, {name: filterName});
		filter.min = min;
		filter.max = max;
		this.setState({
			page: 0,
			offset: 0,
			filters: filters
		});
	}

	handlePageClick(data) {
		const selected = data.selected;
		const offset = Math.ceil(selected * this.state.per_page);

		this.setState({
			page: selected,
			offset: offset
		});
	}

	render() {
		const displayData = this.props.data.filter(element => {
			return this.state.filters.every(filter => {
				const matching_filterable = find(element.filterables, { name: filter.name });
				if (matching_filterable === undefined) {
					return true;
				}

				if (filter.type === FILTER_TYPE.SELECTABLE) {
					const applicable = filter.selectables.filter(selectable => selectable.selected);
					return applicable.length === 0 || (
						applicable.map(selectable => selectable.name).some(name =>
							matching_filterable.value.includes(name)
						)
					);
				} else if (filter.type === FILTER_TYPE.RANGE) {
					return filter.min <= matching_filterable.value &&
					       matching_filterable.value <= filter.max;
				}
				return true;
			});
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
		const pageCount = Math.ceil(displayData.length / this.state.per_page);
		return (
			<Container>
				<div className='panel panel-default'>
					<Flex className='panel-body' alignItem='center'>
						<FilterOptions
							filters={this.state.filters}
							toggleSelected={this.toggleSelected}
							changeBounds={this.changeBounds}
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
					{displayData
							.slice(this.state.offset, this.state.offset + this.state.per_page)
							.map(element => element.display() )}
				</div>
				<Flex justifyContent='center' width='100%'>
					<ReactPaginate
						previousLabel={'<'}
						nextLabel={'>'}
						breakLabel={'...'}
						pageCount={pageCount}
						marginPagesDisplayed={1}
						pageRangeDisplayed={3}
						onPageChange={this.handlePageClick}
						forcePage={this.state.page}
						containerClassName='paginate-container'
						breakClassName='paginate-break'
						pageClassName='paginate-page'
						pageLinkClassName='paginate-link btn btn-default'
						activeClassName='paginate-active'
						previousClassName='paginate-previous'
						nextClassName='paginate-next'
						previousLinkClassName='btn-default btn'
						nextLinkClassName='btn btn-default'
						disabledClassName='btn-default paginate-disabled'
					/>
				</Flex>
			</Container>
		);
	}
}
SortFilterPaginate.defaultPRops = {
	perPage: 6,
};
SortFilterPaginate.propTypes = {
	id: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.shape({
		display: PropTypes.func.isRequired,
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

export { FILTER_TYPE };
