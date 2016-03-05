const assert = require('assert')
const sqlInjection = require('../src/sqlInjection')

describe(`try out sql injection`, () => {
	beforeEach(done => {
		sqlInjection()
		setTimeout(done, 200);
	})
	it(`fails`, () => {
		assert(false)
	})
})
