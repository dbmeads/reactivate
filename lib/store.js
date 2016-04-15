import tv4 from 'tv4';
import {preserve} from './preserve';

const stores = {};

function newStore(key) {
    var subs = new Set();
    var currentState = null;
    var currentSchema;

    function unsubscribe(callback) {
        subs.delete(callback);
        return this;
    }

    var store = {
        setState(state) {
            if (currentSchema && !tv4.validate(state, currentSchema)) {
                throw tv4.error;
            }
            currentState = preserve(state);
            subs.forEach(callback => {
                callback(currentState);
            });
            return this;
        },
        setSchema(schema) {
            currentSchema = schema;
            return this;
        },
        getState() {
            return preserve(currentState);
        },
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

export default key => {
    if (stores[key]) {
        return stores[key];
    }
    return newStore(key);
};