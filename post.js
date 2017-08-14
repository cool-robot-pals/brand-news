/*eslint no-console:0 */

const fetchPosts = require('./src/fetch.js');
const env = require('./env.js');
const Twitter = require('twitter');
const chalk = require('chalk');

const random = (items) => items[Math.floor(Math.random()*items.length)];

const client = new Twitter({
	consumer_key: env.twitterConsumerKey,
	consumer_secret: env.twitterConsumerSecret,
	access_token_key: env.twitterAccess,
	access_token_secret: env.twitterSecret
});

fetchPosts().then(headlines => {
    const status = random(headlines);
	client.post('statuses/update', {status: status},  function(error, tweet, response) {
		if(error) {
            console.error(chalk.red(`✘ Post failed`))
            console.error(error);
            console.error(headlines);
            throw error;
        }
        else {
            console.info(chalk.green(`✔ Posted: ${status}`))
        }
	});
});
