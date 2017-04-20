import React, { Component, PropTypes } from 'react';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import Block from 'jsxstyle/Block';
import { Modal } from '../ui/Bootstrap.jsx';
//import Col from 'jsxstyle/Col';

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
	}

	isValidNum = (str) => (
		str.length > 0 && !isNaN(str)
	);

	onMinChange = (evt) => {
		this.setState({
			min: evt.target.value,
			minValid: this.isValidNum(evt.target.value),
		});
	};

	onMaxChange = (evt) => {
		this.setState({
			max: evt.target.value,
			maxValid: this.isValidNum(evt.target.value),
		});
	};

	apply = () => {
		this.props.changeBounds(
			this.state.min,
			this.state.max
		);
	};

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
DropdownRange.propTypes = {
	changeBounds: PropTypes.func.isRequired,
	filter: PropTypes.shape({
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
};


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
DropdownSelectable.propTypes = {
	filter: PropTypes.shape({
		selectables: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};

class FilterButton extends Component {
	selectableOnClick = (option) => {
		this.props.toggleSelected(this.props.filter.name, option);
	}

	changeBounds = (min, max) => {
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
FilterButton.propTypes = {
	toggleSelected: PropTypes.func.isRequired,
	changeBounds: PropTypes.func.isRequired,
	filter: PropTypes.shape({
		type: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
};

class FilterOptions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobile: false,
		};
	}

	filterButtons = () => {
		return this.props.filters.map(filter => ({
			key: filter.name,
			render: () => (
				<FilterButton
					filter={filter}
					toggleSelected={this.props.toggleSelected}
					changeBounds={this.props.changeBounds}
				/>
			),
		}));
	}

	renderMobile = () => {
		return (
			<Block>
				<button type="button" className="btn btn-default"
					data-toggle="modal" data-target="#filterModal">
					Filters
				</button>

				<Modal.Modal id="filterModal">
					<Modal.Header>
						<Modal.CloseX />
						<Modal.Title>Filters</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row flexWrap='wrap'>
							{this.filterButtons().map(button => (
								<Block key={button.key} marginBottom='1em' marginRight='1em'>
									{button.render()}
								</Block>
							))}
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Modal.CloseButton />
					</Modal.Footer>
				</Modal.Modal>
			</Block>
		);
	}

	renderDesktop = () => {
		return (
			<Row>
				<Block marginRight='18px' fontSize='large'>Filters:</Block>
				{this.filterButtons().map(button => (
					<Block key={button.key}>
						{button.render()}
					</Block>
				))}
			</Row>
		);
	}

	updateDimensions = () => {
		// adapted from
		// http://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
		const element = document.documentElement;
		const body = document.getElementsByTagName('body')[0];
		const width = window.innerWidth || element.clientWidth || body.clientWidth;

		// 768 is the "medium" break point as defined by bootstrap and the default break
		// point for, e.g., navbar switching between mobile- and desktop-variants
		// (see https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss;
		// search for "// Grid breakpoints")
		this.setState({ mobile: width < 768 });
	}
	componentWillMount() {
		this.updateDimensions();
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	render() {
		return this.state.mobile ? this.renderMobile() : this.renderDesktop();
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
};
export default FilterOptions;
