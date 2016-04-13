'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.Config = exports.Store = undefined;

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.React = _react2.default;

exports.Store = _store2.default;
exports.Config = _config2.default;
exports.Component = _component2.default;