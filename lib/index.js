import React from 'react';
import {Key, Route, Store} from 'rille';
import {Component} from 'rille-react';
import {Server, Client} from 'rille-remote';

global.React = React;

const Reactivate = {Client, Component, Key, React, Route, Server, Store};

export default Reactivate;
export {Client, Component, Key, React, Route, Server, Store};