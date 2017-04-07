import React from 'react';
import { NavItem } from '../ui/Bootstrap.jsx';

const Navbar = () => {
    return (
        <div className='navbar navbar-inverse navbar-static-top'>
            <div className='container-fluid'>
                <div className='navbar-header'>
                    <button className='navbar-toggle collapsed'
                            type='button'
                            data-toggle='collapse'
                            data-target='#bs-example-navbar-collapse-1'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <a className='navbar-brand' href='/'>
                        <p>GLAMROUS</p>
                    </a>
                </div>
                <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                    <ul className='nav navbar-nav navbar-right'>
						<NavItem href='/brands'>BRANDS</NavItem>
						<NavItem href='/products'>PRODUCTS</NavItem>
						<NavItem href='/categories'>CATEGORIES</NavItem>
						<NavItem href='/tags'>TAGS</NavItem>
						<NavItem href='/about'>ABOUT</NavItem>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
