import React from 'react';

const Home = () => (
    <div id='myCarousel' className='carousel slide' data-ride='carousel'>
        <ol className='carousel-indicators'>
            <li data-target='#myCarousel' data-slide-to='0' className=''></li>
            <li data-target='#myCarousel' data-slide-to='1' className=''></li>
            <li data-target='#myCarousel' data-slide-to='2' className='active'></li>
        </ol>
        <div className='carousel-inner' role='listbox'>
            <div className='item'>
                <img className='first-slide'
                     src='data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                     alt='First slide'/>
                <div className='container'>
                    <div className='carousel-caption'>
                        <h1>Example headline.</h1>
                        <p>Note: If you're viewing this page via a <code>file://</code> URL, the 'next' and
                            'previous' Glyphicon buttons on the left and right might not load/display properly due
                            to web browser security rules.</p>
                        <p><a className='btn btn-lg btn-primary' href='#' role='button'>Sign up today</a></p>
                    </div>
                </div>
            </div>
            <div className='item active left'>
                <img className='second-slide'
                     src='data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                     alt='Second slide'/>
                <div className='container'>
                    <div className='carousel-caption'>
                        <h1>Another example headline.</h1>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta
                            gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        <p><a className='btn btn-lg btn-primary' href='#' role='button'>Learn more</a></p>
                    </div>
                </div>
            </div>
            <div className='item next left'>
                <img className='third-slide'
                     src='data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                     alt='Third slide'/>
                <div className='container'>
                    <div className='carousel-caption'>
                        <h1>One more for good measure.</h1>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta
                            gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        <p><a className='btn btn-lg btn-primary' href='#' role='button'>Browse gallery</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default Home;
