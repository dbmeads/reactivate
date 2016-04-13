'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function pluck(src) {
    var obj = {};

    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
    }

    keys.forEach(function (key) {
        if (src && src[key]) {
            obj[key] = src[key];
            delete src[key];
        }
    });
    return function (context, key, defaultValue) {
        if (obj[key]) {
            return obj[key].call(context);
        }
        return defaultValue;
    };
}

exports.default = function (spec) {
    var callOnSpec = pluck(spec, 'getInitialState', 'componentDidMount', 'componentWillUnmount');

    return React.createClass(Object.assign({
        getInitialState: function getInitialState() {
            var store = this.store = this.props && this.props.store || spec.store;
            var state = callOnSpec(this, 'getInitialState', null);
            if (store) {
                if (state !== null) {
                    store.setState(state);
                }
                this.setState = store.setState;
                this.getState = store.getState;
                return null;
            } else {
                return state;
            }
        },
        componentDidMount: function componentDidMount() {
            if (this.store) {
                this.callback = function () {
                    this.forceUpdate();
                }.bind(this);
                this.store.subscribe(this.callback);
            }
            return callOnSpec(this, 'componentDidMount');
        },
        componentWillUnmount: function componentWillUnmount() {
            if (this.store) {
                this.store.unsubscribe(this.callback);
            }
            return callOnSpec(this, 'componentWillUnmount');
        }
    }, spec));
};