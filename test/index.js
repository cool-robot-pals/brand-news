const chai = require('chai');
const fetchPosts = require('./../src/fetch.js');

describe('Basic', function() {

	it('should fetch a post',(done)=>{

		fetchPosts().then((posts)=>{
			try {
				chai.expect(posts[0]).to.contain('Big Opportunity for Brands');
				done();
			} catch(e) {
				done(e);
			}
		});

	});

});
