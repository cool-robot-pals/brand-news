const feed = require("feed-read");

const fetch = edition => {

    return new Promise((cool,uncool)=>{

        feed(edition, (err, articles) => {

            if (err) uncool(err);

            let headlines = [];

            articles.map(article => {
                headlines.push(`${article.title}, and that’s a big opportunity for brands ${article.link}`);
            })

            cool(headlines);
        });
    });
}


module.exports = fetch;
