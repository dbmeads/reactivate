import config from './config';
import component from './component';
import store from './store';

function Reactivate(options) {
    global.React = config(options).React;
}

Reactivate.component = component;
Reactivate.store = store;

export default Reactivate;