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
                        <p>Glamrous</p>
                    </a>
                </div>
                <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                    <ul className='nav navbar-nav'>
                        <li className='nav-item'>
                            <a className='nav-link' href='google.com'>About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Navbar;
