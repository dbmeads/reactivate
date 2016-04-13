'use strict';

var _index = require('../lib/index');

var _chai = require('chai');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('store', function () {

    var store;

    beforeEach(function () {
        store = (0, _index.Store)(_uuid2.default.v4());
    });

    it('should be immutable.', function () {
        store.setState({ name: 'Frank' }).getState().name = 'Jim';

        (0, _chai.expect)(store.getState().name).to.eql('Frank');
    });

    it('should validate against JSON Schema.', function () {
        store.setSchema({
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                }
            },
            additionalProperties: false,
            required: ['name']
        });

        (0, _chai.expect)(function () {
            return store.setState({ name: 'Don', extraProp: 'Hi!' });
        }).to.throw(Error);
    });

    it('should handle arrays', function () {
        (0, _chai.expect)(store.setState([{ name: 'Jim' }, { name: 'Bob' }]).getState().length).to.eql(2);
    });

    it('should handle strings', function () {
        (0, _chai.expect)(store.setState('hi').getState()).to.equal('hi');
    });

    it('should handle numbers', function () {
        (0, _chai.expect)(store.setState(1).getState()).to.equal(1);
    });

    it('should handle booleans', function () {
        (0, _chai.expect)(store.setState(false).getState()).to.eql(false);
    });
});