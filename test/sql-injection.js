const assert = require('assert')
const sqlInjection = require('../src/sqlInjection')

describe(`try out sql injection`, () => {
	beforeEach(done =>
		sqlInjection(':memory:').then(done)
	)
	it(`fails`, () => {
		assert(true)
	})
})
