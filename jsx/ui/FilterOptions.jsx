import React, { Component, PropTypes } from 'react';
import Flex from 'jsxstyle/Flex';

export const FILTER_TYPE = {
	SELECTABLE: 0,
	RANGE: 1,
};
class DropdownRange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			min: this.props.filter.min,
			max: this.props.filter.max,
			minValid: true,
			maxValid: true,
		};

		const isValidNum = (str) => {
			return (
				str.length > 0 &&
				!isNaN(str)
			)
		}

		this.onMinChange = (evt) => {
			this.setState({
				min: evt.target.value,
				minValid: isValidNum(evt.target.value),
			});
		};
		this.onMaxChange = (evt) => {
			this.setState({
				max: evt.target.value,
				maxValid: isValidNum(evt.target.value),
			});
		};
		this.apply = () => {
			this.props.changeBounds(
				this.state.min,
				this.state.max,
			);
		};
	}

	render() {
		const minID = this.props.filter.name + 'min';
		const maxID = this.props.filter.name + 'max';
		return (
			<Flex padding='5px' flexDirection='column'>
				<Flex flexDirection='row'>
					<label htmlFor={minID}>From:</label>
					<input
						type='text'
						onChange={this.onMinChange}
						value={this.state.min}
					/>
				</Flex>
				<Flex flexDirection='row'>
					<label htmlFor={maxID}>To:</label>
					<input
						type='text'
						onChange={this.onMaxChange}
						value={this.state.max}
					/>
				</Flex>
				<button
					className='btn btn-default'
					onClick={this.apply}
					disabled={!(this.state.minValid && this.state.maxValid)}
				>
					Apply
				</button>
			</Flex>
		);
	}
}

const DropdownSelectable = (props) => (
	<Flex padding='5px' flexDirection='column'>
		{props.filter.selectables.map(each => {
			const id = 'chkbox' + each.name;
			return (
				<div key={id}>
					<input
						id={id}
						type='checkbox'
						checked={each.selected}
						onClick={props.onClick.bind(null, each.name)}
					/>
					<label htmlFor={id}>{each.name}</label>
				</div>
			);
		})}
	</Flex>
);

class FilterButton extends Component {
	constructor(props) {
		super(props);

		this.selectableOnClick = this.selectableOnClick.bind(this);
		this.changeBounds = this.changeBounds.bind(this);
	}

	selectableOnClick(option) {
		this.props.toggleSelected(this.props.filter.name, option);
	}

	changeBounds(min, max) {
		this.props.changeBounds(this.props.filter.name, min, max);
	}

	render() {
		const filter = this.props.filter;
		let dropdown = null;
		if (filter.type === FILTER_TYPE.SELECTABLE) {
			dropdown = (
				<DropdownSelectable
					filter={filter}
					onClick={this.selectableOnClick}
				/>
			);
		} else if (filter.type === FILTER_TYPE.RANGE) {
			dropdown = (
				<DropdownRange
					filter={filter}
					changeBounds={this.changeBounds}
				/>
			);
		}
		return (
			<Flex className='dropdown' marginRight='5px'>
				<button
					className='btn btn-default'
					data-toggle='dropdown'
				>
					{filter.name}
				</button>
				<div className='dropdown-menu'>
					{dropdown}
				</div>
			</Flex>
		);
	}
}

class FilterOptions extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Flex>
				<Flex marginRight='5px' fontSize='large'>Filters:</Flex>
				{this.props.filters.map(filter => (
					<FilterButton
						key={filter.name}
						filter={filter}
						toggleSelected={this.props.toggleSelected}
						changeBounds={this.props.changeBounds}
					/>
				))}
			</Flex>
		);
	}
}
FilterOptions.propTypes = {
	filters: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		type: PropTypes.oneOf([FILTER_TYPE.SELECTABLE, FILTER_TYPE.RANGE]).isRequired,
		min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		selectables: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			selected: PropTypes.bool.isRequired,
		})),
	}).isRequired).isRequired,
	toggleSelected: PropTypes.func.isRequired,
	changeBounds: PropTypes.func.isRequired,
}
export default FilterOptions;
