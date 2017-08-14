const fetchPosts = require('./index.js')
const env = require('./env.js')
const Twitter = require('twitter')

const random = (items) => items[Math.floor(Math.random()*items.length)];

const client = new Twitter({
    consumer_key: env.twitterConsumerKey,
    consumer_secret: env.twitterConsumerSecret,
    access_token_key: env.twitterAccess,
    access_token_secret: env.twitterSecret
});

fetchPosts('http://rss.cnn.com/rss/edition.rss').then(headlines => {
    client.post('statuses/update', {status: random(headlines)},  function(error, tweet, response) {
        if(error) throw error;
        console.log(tweet);  // Tweet body.
        console.log(response);  // Raw response object.
    });
})
