const feed = require("feed-read");
const toTitleCase = require('to-title-case');

const random = (items) => items[Math.floor(Math.random()*items.length)];

const replacers = [
    `$1, and That’s a Big Opportunity for Brands`
];
const questionReplacers = [
    `$1 And Why That’s a Big Opportunity for Brands`
]
const sources = [
    'http://rss.cnn.com/rss/edition.rss',
    'http://www.vice.com/en_us/rss',
    'https://www.vox.com/rss/index.xml',
    'http://waypoint.vice.com/en_us/rss'
]

const fetch = () => {

    let edition = random(sources);

    return new Promise((cool,uncool)=>{

        feed(edition, (err, articles) => {

            if (err) uncool(err);
            let headlines = [];

            articles.map(article => {
                let replacer = random(article.title.indexOf('?') > 1?questionReplacers:replacers);

                console.log();

                headlines.push(
                    replacer.replace('$1',toTitleCase(article.title))
                    + ' '
                    + article.link
                );
            })

            cool(headlines);
        });
    });
}


module.exports = fetch;
