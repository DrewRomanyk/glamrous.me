import React from 'react';

const Home = () => (
    <div id='myCarousel' className='carousel slide' data-ride='carousel'>
        <div className="carousel-caption">
            <h1>Be Glamrous</h1>
        </div>
        <ol className='carousel-indicators'>
            <li data-target='#myCarousel' data-slide-to='0' className=''></li>
            <li data-target='#myCarousel' data-slide-to='1' className=''></li>
            <li data-target='#myCarousel' data-slide-to='2' className='active'></li>
        </ol>
        <div className='carousel-inner' role='listbox'>
            <div className='first-item item'>
            </div>
            <div className='second-item item active left'>
            </div>
            <div className='third-item item next left'>
            </div>
        </div>
    </div>
);
export default Home;
