'use strict';

var stores = {};

function newStore(key) {
    var subs = new Set();
    var currentState = null;

    return stores[key] = {
        setState: function (state) {
            currentState = state;
            subs.forEach(function (callback) {
                callback(currentState);
            });
            return this;
        },
        getState: function () {
            return currentState;
        },
        subscribe: function (callback) {
            subs.add(callback);
            return this;
        },
        unsubscribe: function (callback) {
            subs.delete(callback);
            return this;
        }
    };
}

module.exports = function store(key) {
    if (stores[key]) {
        return stores[key];
    }
    return newStore(key);
}