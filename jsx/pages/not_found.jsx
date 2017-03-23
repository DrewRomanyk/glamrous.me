import React from 'react';

function getGif() {
    var gifs = [
        'confused.gif',
        'donald.gif',
        'wow.gif'
    ];

    var text = [
        'Where are we?',
        'Yeah, he\'s just as lost...',
        'Wooooow'
    ]

    var randomIndex = Math.floor(Math.random() * gifs.length); 
    return {gif: gifs[randomIndex], text: text[randomIndex]};
}

var g = getGif();
var gif = g.gif;
var text = g.text;
var c = gif === "confused.gif" ? "bottom-fix" : "";

const Not_Found = () => (
    <div className="container center">
        <h1 className="center">404</h1>
        <p><b>Page not found - <a href="/">Go home?</a></b></p>

        <img className={c} src={"/static/img/404/" + gif}/>

        <p><small>{text}</small></p>
    </div>
);
export default Not_Found;
