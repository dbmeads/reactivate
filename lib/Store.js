import {Log} from './Log';
import {preserve} from './util';

const stores = {};

function newStore(key, options) {
    options = Object.assign({capacity: 1, immutable: true}, options);

    var {push, values, value, callCount, size} = Log(options);
    var subs = new Set();

    function unsubscribe(callback) {
        subs.delete(callback);
    }

    var store = Object.assign({
        push(value) {
            push(value);
            subs.forEach(callback => {
                callback(preserve(value, options.immutable));
            });
            return this;
        },
        subscribe(callback) {
            subs.add(callback);
            return () => {
                unsubscribe(callback);
            };
        },
        values,
        value,
        callCount,
        size
    });

    if (key) {
        stores[key] = store;
    }

    return store;
}

function Store(key, options) {
    if (key) {
        if (typeof key === 'string') {
            if (stores[key]) {
                return stores[key];
            }
            return newStore(key, options);
        }
        return newStore(undefined, key);
    }
    return newStore();
}

export {Store};