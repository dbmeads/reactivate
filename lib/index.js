import config from './config';
import component from './component';
import store from './store';

function Reactivate(options) {
    config(options);

    global.React = config.React;
}

Reactivate.component = component;
Reactivate.store = store;

export default Reactivate;