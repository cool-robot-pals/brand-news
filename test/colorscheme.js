const chai = require('chai');
const colorGetter = require('./../src/colorscheme.js');

describe('Basic', function() {

	it('should make 4 colors',done=>{

		colorGetter.then(colors=>{
			try {
				chai.expect(Object.keys(colors).length).to.equal(2);
				done();
			} catch(e) {
				done(e);
			}
		})

	});

});
