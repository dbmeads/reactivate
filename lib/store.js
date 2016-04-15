import config from './config';
import tv4 from 'tv4';

const options = config();
const stores = {};

function processState(state) {
    if (options.immutable) {
        if (Array.isArray(state)) {
            return JSON.parse(JSON.stringify(state));
        } else if (typeof state === 'object') {
            return Object.assign({}, state);
        }
    }
    return state;
}

function newStore(key) {
    var subs = new Set();
    var currentState = null;
    var currentSchema;

    function unsubscribe(callback) {
        subs.delete(callback);
        return this;
    }

    return stores[key] = {
        setState(state) {
            if (currentSchema && !tv4.validate(state, currentSchema)) {
                throw tv4.error;
            }
            currentState = processState(state);
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
            return processState(currentState);
        },
        subscribe(callback) {
            subs.add(callback);
            return () => {
                unsubscribe(callback);
            };
        }
    };
}

export default key => {
    if (stores[key]) {
        return stores[key];
    }
    return newStore(key);
};