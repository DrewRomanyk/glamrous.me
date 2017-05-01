window.onload = function() {

let WIDTH, HEIGHT, SPEED, context, projection;
const start_time = Date.now();
function setup() {
	WIDTH = Math.min(800, document.getElementById('canvas-holder').offsetWidth);
	HEIGHT = WIDTH;
	SPEED = -1e-2;

	document.getElementById('canvas-holder').innerHTML='';
	const canvas = d3.select('#canvas-holder').append('canvas')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);
	context = canvas.node().getContext('2d');

	projection = d3.geoOrthographic()
		.scale(WIDTH / 2.1)
		.translate([WIDTH / 2, HEIGHT / 2])
		.precision(.5);
}

let graticule = d3.geoGraticule();

const grid = graticule();
let id = 0;
const nextId = function() { id = ~~(id + 1); return id; }

const λ = (α) => (α > 180 ? α - 360 : α);
const φ = (δ) => (δ);
let locations = [];

const starClassColors = {
	O: {foreground: '#0037ff', background: '#ddd'},
	B: {foreground: '#0fb4ff', background: '#ddd'},
	A: {foreground: '#3369ff', background: '#ddd'},
	F: {foreground: '#888888', background: '#ddd'},
	G: {foreground: '#ffa94d', background: '#ddd'},
	K: {foreground: '#ff981a', background: '#ddd'},
	M: {foreground: '#d67600', background: '#ddd'},
};
const starClass = function(temp) {
	if (temp >= 33000) return 'O';
	if (temp >= 10500) return 'B';
	if (temp >= 7500) return 'A';
	if (temp >= 6000) return 'F';
	if (temp >= 5500) return 'G';
	if (temp >= 4000) return 'K';
	return 'M';
}
const drawStars = function(view, path) {
	locations.forEach(function({α, δ, temp, diameter}) {
		const point = {type: 'Point', coordinates: [λ(α), φ(δ)], id: nextId(), diameter: diameter};
		context.beginPath();
		path(point);
		context.fillStyle = starClassColors[starClass(temp)][view];
		context.fill();
	});
};

setup();
function doTimer() {
	const path = d3.geoPath()
		.projection(projection)
		.pointRadius(function (d) { return d.diameter; })
		.context(context);
	return d3.timer(function() {
		context.clearRect(0, 0, WIDTH, HEIGHT);

		projection.rotate([SPEED * (Date.now() - start_time), -15]).clipAngle(90);

		projection.clipAngle(180);

		context.beginPath();
		path(grid);
		context.lineWidth = .5;
		context.strokeStyle = "rgba(119,119,119,.5)";
		context.stroke();

		drawStars('background', path);

		projection.clipAngle(90);

		drawStars('foreground', path);
	});
}
let timer = doTimer();

const url_of_page = function(page) {
	return '//spacecowboys.me/api/v1/stars?page=' + page;
}
for (let page = 1; page < 32; page++) {
	d3.json(url_of_page(page), function(err, json) {
		if (err) { console.error(err); return; }

		Array.prototype.push.apply(locations, json.objects.map(function(star) {
			return ({
				δ: star.dec,
				α: star.ra,
				temp: star.temperature,
				diameter: star.diameter,
			});
		}));
	});
}

window.addEventListener('resize', function() { setup(); timer.stop(); timer = doTimer(); }, true);
};
