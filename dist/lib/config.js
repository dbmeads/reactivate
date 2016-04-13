'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tv = require('tv4');

var _tv2 = _interopRequireDefault(_tv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    immutable: true
};

var schema = {
    type: 'object',
    properties: {
        immutable: {
            type: 'boolean'
        }
    }
};

var initialized = false;

exports.default = function (options) {
    if (options) {
        if (initialized) {
            throw new Error('Reconfiguration not allowed.');
        } else if (_tv2.default.validate(options, schema)) {
            initialized = true;
            return Object.assign(config, options);
        } else {
            throw _tv2.default.error;
        }
    }
    return Object.assign({}, config);
};