const chai = require('chai');
const colors = require('./../src/colorscheme.js');

describe('Basic', function() {

	it('should make 4 colors',()=>{

		chai.expect(Object.keys(colors).length).to.equal(2);

	});

});
