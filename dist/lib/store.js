'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _tv = require('tv4');

var _tv2 = _interopRequireDefault(_tv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = (0, _config2.default)();
var stores = {};

function processState(state) {
    if (options.immutable) {
        if (Array.isArray(state)) {
            return JSON.parse(JSON.stringify(state));
        } else if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) === 'object') {
            return Object.assign({}, state);
        }
    }
    return state;
}

function newStore(key) {
    var subs = new Set();
    var currentState = null;
    var currentSchema;

    return stores[key] = {
        setState: function setState(state) {
            if (currentSchema && !_tv2.default.validate(state, currentSchema)) {
                throw _tv2.default.error;
            }
            currentState = processState(state);
            subs.forEach(function (callback) {
                callback(currentState);
            });
            return this;
        },
        setSchema: function setSchema(schema) {
            currentSchema = schema;
            return this;
        },
        getState: function getState() {
            return processState(currentState);
        },
        subscribe: function subscribe(callback) {
            subs.add(callback);
            return this;
        },
        unsubscribe: function unsubscribe(callback) {
            subs.delete(callback);
            return this;
        }
    };
}

exports.default = function (key) {
    if (stores[key]) {
        return stores[key];
    }
    return newStore(key);
};