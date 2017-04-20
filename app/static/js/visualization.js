(function() {

const WIDTH = 800,
      HEIGHT = 800,
      SPEED = -1e-2;
const start_time = Date.now();

let projection = d3.geoOrthographic()
	.scale(WIDTH / 2.1)
	.translate([WIDTH / 2, HEIGHT / 2])
	.precision(.5);

let graticule = d3.geoGraticule();

const canvas = d3.select('#canvas-holder').append('canvas')
	.attr('width', WIDTH)
	.attr('height', HEIGHT);
const context = canvas.node().getContext('2d');

let path = d3.geoPath()
	.projection(projection)
	.pointRadius(function (d) { return d.diameter; })
	.context(context);

const grid = graticule();
let id = 0;
const nextId = function() { id = ~~(id + 1); return id; }

const λ = (α) => (α > 180 ? α - 360 : α);
const φ = (δ) => (δ);
let locations = [];
const drawStars = function(view) {
	locations.forEach(function(location) {
		const α = location.α; // right ascension
		const δ = location.δ; // declination
		const point = {type: 'Point', coordinates: [λ(α), φ(δ)], id: nextId(), diameter: location.diameter};
		context.beginPath();
		path(point);
		context.fillStyle = location[view];
		context.fill();
	});
};

d3.timer(function() {
	context.clearRect(0, 0, WIDTH, HEIGHT);

	projection.rotate([SPEED * (Date.now() - start_time), -15]).clipAngle(90);

	//context.beginPath();
	//path({type: 'Sphere'});
	//context.lineWidth = 3;
	//context.strokeStyle = "#000";
	//context.stroke();
	//context.fillStyle = "#fff";
	//context.fill();

	projection.clipAngle(180);

	context.beginPath();
	path(grid);
	context.lineWidth = .5;
	context.strokeStyle = "rgba(119,119,119,.5)";
	context.stroke();

	drawStars('background');

	projection.clipAngle(90);

	drawStars('foreground');
});

const url_of_page = function(page) {
	return '/static/js/lol-api/stars.' + page;
}
for (let page = 1; page < 32; page++) {
	d3.json(url_of_page(page), function(err, json) {
		if (err) { console.error(err); return; }

		Array.prototype.push.apply(locations, json.objects.map(function(star) {
			return ({
				δ: star.dec,
				α: star.ra,
				foreground: '#000',
				background: '#ddd',
				diameter: star.diameter,
			});
		}));
	});
}

})();
