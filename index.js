/*eslint no-console:0 */

const fetchPosts = require('./src/fetch.js');

fetchPosts().then(console.log);
