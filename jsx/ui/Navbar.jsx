import React from 'react';

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
                        <li className='nav-item'>
                            <a className='nav-link' href='/brands'>BRANDS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/products'>PRODUCTS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/categories'>CATEGORIES</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/tags'>TAGS</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/about'>ABOUT</a>
                        </li>
                        <li>
                            <div className='searchBox'>
                            <span className='icon'><i className='fa fa-search'></i></span>
                            <input type='search' className='search' placeholder='Search'/>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
