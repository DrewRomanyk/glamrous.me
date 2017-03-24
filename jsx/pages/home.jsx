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
            <div className='item'>
                <img className='first-slide'
                     src='/static/img/home/slide1.jpg'
                     alt='First slide'/>
            </div>
            <div className='item active left'>
                <img className='second-slide'
                     src='/static/img/home/slide2.jpg'
                     alt='Second slide'/>
            </div>
            <div className='item next left'>
                <img className='third-slide'
                     src='/static/img/home/slide3.jpg'
                     alt='Third slide'/>
            
            </div>
        </div>
    </div>
);
export default Home;
