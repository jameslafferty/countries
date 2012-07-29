var countries = require('../lib/countries.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['countries'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(5);
    // tests here
	test.equal(typeof countries.checkboxes, 'function', 'countries.checkboxes is a function.');
	test.equal(typeof countries.getAbbr, 'function', 'countries.getAbbr is a function.');
	test.equal(typeof countries.getContinent, 'function', 'countries.getContinent is a function.');
	test.equal(typeof countries.getName, 'function', 'countries.getName is a function.');
	test.equal(typeof countries.select, 'function', 'countries.select is a function.');
    test.done();
  }
};
