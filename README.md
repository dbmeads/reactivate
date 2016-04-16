# Reactivate

[![Build Status](https://img.shields.io/travis/dbmeads/reactivate/master.svg?style=flat-square)](https://travis-ci.org/dbmeads/reactivate)
[![npm version](https://img.shields.io/npm/v/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)
[![npm downloads](https://img.shields.io/npm/dm/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md#pull-requests)

## Quick Links

#### General
* [Change Log](#change-log)
* [Examples](#example-apps)
* [Installation](#installation)

#### Modules
* [Store](#store)
* [Component](#component)

## Building/Contributing

```
# Build
$ npm run build

# Test
$ npm test
```

## Installation

* Reactivate assumes you'll have your favorite version of React already installed.

## Example Apps

[Hello Reactivate!](https://github.com/dbmeads/reactivate.helloworld)

## Store

* Store is a simple subscription based state engine.
* Store optionally supports JSON Schema based validation. (http://json-schema.org/)
* Store supports keys (e.g.: `Store([key])`) that register a store for easy retrieval at a later time.

```js
import {Store} from 'reactivate';

const store = Store();

// You can subscribe to receive state updates
var unsubscribe = store.subscribe(state => console.log('My name is ' + state.name + '!'));

// You can update state
store.push({name: 'Bob'});

// You can get the current state at any time
console.log(JSON.stringify(store.value()));

// You can unsubscribe at a later time by using the function returned from subscribe
unsubscribe();
```

### Store Options
```js

const options = {
    capacity: 10, // Maximum number of state changes to retain at any given time (defaults to 1)
    immutable: <true|false>, // Should the store protect against outside tampering of state data? (defaults to true)
    schema: ... // JSON Schema for the store to validate state changes against (defaults to no validation)
}

// A private store that utilizes default options
const store = Store();

// A private store that utilizes provided options
const store = Store(options);

// A public store that utilizes default options
const store = Store('myStore');

// A public store that utilizes provided options
const store = Store('myStore', options);


```

### JSON Schema Validation

* JSON Schema may be set on a store to provide state validation

```js

const store = Store({
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            }
        },
        additionalProperties: false,
        required: ['name']
    }
});

// Will throw a validation error
store.push({});
```

[Back To Top](#reactivate)

## Component

* Components are pre-wired to render whenever a Reactivate store changes state.
* Components are React components and still support the React features you've come to love.
* Components support stateful primitives, arrays, objects, etc.

```js
import {Component,Store} from 'reactivate';
import {render} from 'react-dom';

const HelloReactivate = Component({
    store: Store('/profile'),
    getInitialState() {
        return {name: 'Reactivate'};
    },
    onChange(event) {
        this.store.push({
            name: event.target.value
        });
    },
    render() {
        return (
            <div>
                <Greeting store={this.store}/>
                <div>
                    <hr/>
                    <input type="text" onChange={this.onChange} placeholder="Enter Name"/>
                </div>
            </div>
        )
    }
});

const Greeting = Component({
    render() {
        return <span>Hello {this.store.value().name}!</span>
    }
});

render(
    <HelloReactivate></HelloReactivate>,
    document.getElementById('app')
);
```

[Back To Top](#reactivate)

## Change Log

#### 1.5.3
1. Added "immutable" option to Store.

#### 1.5.0                      
1. Changed "setState" to "push" in preparation for new features. 
2. Changed "getState" to "value" in preparation for new features.
3. Added "History" module to record pushes.
4. Component now works through the "this.store" reference.
5. Due to history, you can now iterate over store.values() as a stream.

[Back To Top](#reactivate)