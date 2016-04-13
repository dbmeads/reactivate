'use strict';

var _index = require('../lib/index');

var _chai = require('chai');

describe('store', function () {

    it('should move React to global for now.', function () {
        (0, _chai.expect)(React).to.exist;
    });
});