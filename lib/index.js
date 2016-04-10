import config from './config';
import component from './component';
import store from './store';
import React from 'react';

function Reactivate(options) {
    config(options);
}

global.React = React;

Reactivate.component = component;
Reactivate.store = store;

export default Reactivate;