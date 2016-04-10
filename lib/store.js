import config from './config';
import tv4 from 'tv4';

const options = config();
const stores = {};

function processState(state) {
    return options.immutable ? Object.assign({}, state) : state
}

function newStore(key) {
    var subs = new Set();
    var currentState = null;
    var currentSchema;

    return stores[key] = {
        setState(state) {
            if(currentSchema && !tv4.validate(state, currentSchema)) {
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
            return this;
        },
        unsubscribe(callback) {
            subs.delete(callback);
            return this;
        }
    };
}

export default key => {
    if (stores[key]) {
        return stores[key];
    }
    return newStore(key);
};