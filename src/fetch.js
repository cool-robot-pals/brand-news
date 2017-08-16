const feed = require('feed-read');
const toTitleCase = require('to-title-case');
const random = require('random-item-in-array');

const replacers = [
	'$1, and That’s a Big Opportunity for Brands'
];
const questionReplacers = [
	'$1 And Why That’s a Big Opportunity for Brands'
];
const sources = [
	'http://rss.cnn.com/rss/edition.rss',
	'http://www.vice.com/en_us/rss',
	'https://www.vox.com/rss/index.xml',
	'http://kotaku.com/rss',
	'www.altpress.com/site/rss/',
	'https://www.citylab.com/feeds/posts/',
	'http://munchies.vice.com/en_uk/rss',
	'https://www.theguardian.com/uk/commentisfree/rss',
	'https://theoutline.com/feeds/recent.rss',
];
const keepItLightHearted = [
	'kill',
	'murder'
];

const fetchPosts = () => {

	let edition = random(sources);

	return new Promise((cool,uncool)=>{

		feed(edition, (err, articles) => {

			if (err) {
				console.error(edition);
				uncool(err);
			}
			let headlines = [];

			articles.filter(article => {
				let okay = true;
				keepItLightHearted.map(word => {
					if(article.title.indexOf(word) !== -1) {
						okay = false;
					}
				});
				return okay;
			});

			articles.map(article => {

				[',','.',';','|'].map(token => {
					article.title = article.title.split(token)[0];
				});
				
				article.title = article.title.trim();
				article.title = toTitleCase(article.title);
					
				let replacer = random(article.title.indexOf('?') > 1?questionReplacers:replacers);

				headlines.push(
					replacer.replace('$1',article.title) + ' ' + article.link
				);
			});

			cool(headlines);
		});
	});
};


module.exports = fetchPosts;
