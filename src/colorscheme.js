const random = require('random-item-in-array');
const scraperjs = require('scraperjs');

const getter = () => {
	return scraperjs.StaticScraper.create('http://www.colourlovers.com/ajax/browse-palettes/')
	    .scrape(function($) {
	        return $(random($('.detail-row')));
	    })
	    .then(function($item) {
			return {
				color: $item.find('.palette span:nth-child(1)').css()['background-color'].replace('#',''),
				complement: $item.find('.palette span:nth-child(2)').css()['background-color'].replace('#','')
			}
	    })
};
module.exports = getter;
