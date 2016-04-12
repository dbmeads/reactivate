# Reactivate

[![Build Status](https://img.shields.io/travis/dbmeads/reactivate/master.svg?style=flat-square)](https://travis-ci.org/dbmeads/reactivate)
[![npm version](https://img.shields.io/npm/v/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)
[![npm downloads](https://img.shields.io/npm/dm/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)

## Building/Contributing

```
# Build
$ npm run build

# Test
$ npm test
```

## Installation

* Reactivate assumes you'll have your favorite version of React already installed.

## Why use Store?

* Store is a simple subscription based state engine.
* Store supports JSON Schema based validation on any store. (http://json-schema.org/)

```js
import {Store} from 'reactivate';

const store = Store('/profile');

function callback(state) {
    console.log('My name is ' + state.name + '!');
}

// You can subscribe to receive state updates
store.subscribe(callback);

// You can update state
store.setState({name: 'Bob'});

// You can get the current state at any time
console.log(JSON.stringify(store.getState()));

// You can unsubscribe from state updates as well
store.unsubscribe(callback);

// You can add JSON Schema based validation to any store
store.setSchema({
    type: 'object',
    properties: {
        name: {
            type: 'string'
        }
    },
    additionalProperties: false,
    required: ['name']
});

// Will fail JSON Schema validation as `name` is not present.
store.setState({});

```

## Why use Component?

* Components are pre-wired to update whenever a Reactivate store changes state.
* Components are React components with more robust state management.
* Components support stateful primitives, arrays, objects, etc.

```js
import {Component,Store} from 'reactivate';
import { render } from 'react-dom';

const store = Store('/helloworld');

// You can use this.getState() within a component to get the current state.
// You can use this.setState(state) within a component to update the state.
// Note that this.state will be null as Reactivate does not set it.
const HelloWorld = Component({
    render: function() {
        return (
            <div><span>Hello {this.getState()}!</span></div>
        );
    }
});

render(
    <HelloWorld store={store}></HelloWorld>,
    document.getElementsByName('body')[0]
);

store.setState('world');
store.setState('Jim');
store.setState('John');

```