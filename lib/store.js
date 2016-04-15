import {History} from './history';
import {preserve} from './preserve';

const stores = {};

function newStore(key, options) {
    options = options || {};

    var subs = new Set();

    var history = History(options);

    function unsubscribe(callback) {
        subs.delete(callback);
        return this;
    }

    var store = {
        push(value) {
            history.push(value);
            subs.forEach(callback => {
                callback(preserve(value));
            });
            return this;
        },
        value: history.value,
        values: history.values(),
        subscribe(callback) {
            subs.add(callback);
            return () => {
                unsubscribe(callback);
            };
        }
    };

    if (key) {
        stores[key] = store;
    }

    return store;
}

function Store(key, capacity) {
    if (key) {
        if (typeof key === 'string') {
            if (stores[key]) {
                return stores[key];
            }
            return newStore(key, capacity);
        }
        return newStore(undefined, key);
    }
    return newStore();
}

export {Store};