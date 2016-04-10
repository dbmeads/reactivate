import config from './config';

const options = config();
const stores = {};

function processState(state) {
    return options.immutable ? Object.assign({}, state) : state
}

function newStore(key) {
    var subs = new Set();
    var currentState = null;

    return stores[key] = {
        setState(state) {
            currentState = processState(state);
            subs.forEach(callback => {
                callback(currentState);
            });
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