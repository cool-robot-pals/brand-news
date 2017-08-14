const ColorScheme = require('color-scheme');
const random = require('random-item-in-array');

const scheme = (new ColorScheme).from_hue(Math.random()*255).scheme(random(['contrast','triade'])).variation(random(['default','light']));
const colors = scheme.colors();

let exportable = {};

if(Math.random() > .5) {
	exportable.light = colors[0];
	exportable.dark = colors[4];
} else {
	exportable.light = colors[0];
	exportable.dark = colors[1];
}

if(Math.random() > .5) {
	exportable.color = exportable.light;
	exportable.complement = exportable.dark;
} else {
	exportable.color = exportable.dark;
	exportable.complement = exportable.light;
}

module.exports = exportable;
