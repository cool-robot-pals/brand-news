const chai = require('chai');
const fetchPosts = require('./../src/fetch.js');

const testUntil = 4;

describe('Basic', function() {

	it('should fetch 4 posts',(done)=>{

		let testedPosts = 0;

		const callback = posts =>{
			try {
				chai.expect(posts[0]).to.contain('Big Opportunity for Brands');
				testedPosts++;
				testedPosts >= testUntil ? done() : null;
			} catch(e) {
				console.error(e);
				done(e);
			}
		};

		for(let i = 0;i < testUntil;i++) {
			fetchPosts().then(callback);
		}

	});

});
