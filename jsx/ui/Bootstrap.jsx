import React from 'react';
import intersection from 'lodash/intersection';
import omit from 'lodash/omit';

const bootstrap = (name, attributes = [], element = 'div') => (
	(props) => {
		let pass = {};
		let className = name;
		if (attributes.length > 0) {
			intersection(Object.keys(props), attributes).forEach(attribute => {
				className += ' ' + attribute;
			});

			pass = omit(props, attributes);
		} else {
			pass = props;
		}
		return React.createElement(element, {...pass, className: className });
	}
);

export const Badge = bootstrap('badge');
export const Caption = bootstrap('caption');
export const Container  = bootstrap('container', ['center']);

export const GridCell = (props) => {
	let classes = [];
	const sizes = ['xs', 'sm', 'md', 'lg'];
	sizes.forEach(size => {
		if (props[size]) {
			classes.push(['col', size, props[size]].join('-'));
		}
	});
	const pass = omit(props, sizes);
	const className = classes.join(' ');
	return bootstrap(className, ['text-center'])(pass);
};


export const Modal = {
	Header:     bootstrap('modal-header'),
	Body:       bootstrap('modal-body'),
	Footer:     bootstrap('modal-footer'),
	Title:      bootstrap('modal-title'),

	CloseX:     () => (
		<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
			<span aria-hidden='true'>&times;</span>
		</button>
	),
	CloseButton: () => (
		<button type="button" className="btn btn-default" data-dismiss="modal">
			Close
		</button>
	),

	Modal: (props) => (
		<div id={props.id} className='modal fade' role='dialog'>
			<div className='modal-dialog'>
				<div className='modal-content'>
					{props.children}
				</div>
			</div>
		</div>
	),
};
export const NavItem = (props) => (
	<li className='nav-item'>
		<a className='nav-link' href={props.href}>{props.children}</a>
	</li>
);
export const Panel = {
	Panel: bootstrap('panel panel-default'),
	Heading: bootstrap('panel-heading'),
	Body: bootstrap('panel-body'),
};

export const PageHeader = bootstrap('page-header', [], 'h2');
export const Row        = bootstrap('row');

export const Thumbnail = bootstrap('thumbnail');
