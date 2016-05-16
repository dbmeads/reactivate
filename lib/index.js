import React from 'react';
import {Entry, Key, Route, Store} from 'rille';
import {Component} from 'rille-react';

global.React = React;

const Reactivate = {Component, Entry, Key, React, Route, Store};

export default Reactivate;
export {Component, Entry, Key, React, Route, Store};