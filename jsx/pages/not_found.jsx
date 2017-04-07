import React from 'react';
import { Container } from '../ui/Bootstrap.jsx';

function getGif() {
    var gifs = [
        'confused.gif',
        'donald.gif',
        'wow.gif',
        'hacking.gif',
        'beyo.gif'
    ];

    var text = [
        'Where are we?',
        'Yeah, he\'s just as lost...',
        'Wooooow',
        'All your base are belong to us',
        '#StayGlam'
    ];

    var randomIndex = Math.floor(Math.random() * gifs.length); 
    return {gif: gifs[randomIndex], text: text[randomIndex]};
}

var g = getGif();
var gif = g.gif;
var text = g.text;
var c = gif === 'confused.gif' ? 'bottom-fix' : '';

const Not_Found = () => (
	<Container center={true}>
        <h1 className="center">404</h1>
        <p><b>Page not found - <a href="/">Go home?</a></b></p>

        <img className={c} src={'/static/img/404/' + gif}/>

        <p><small>{text}</small></p>
	</Container>
);
export default Not_Found;
