# Reactivate

[![Build Status](https://img.shields.io/travis/dbmeads/reactivate/master.svg?style=flat-square)](https://travis-ci.org/dbmeads/reactivate)
[![npm version](https://img.shields.io/npm/v/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)
[![npm downloads](https://img.shields.io/npm/dm/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)

## Quick Links

#### General
[Change Log](#change-log)
[Examples](#example-apps)
[Installation](#installation)

#### Modules
[Store] (#why-use-store)
[Component] (#why-use-component)

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

## Why use Store?

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
    capacity: 10 // Maximum number of state changes to retain at any given time (defaults to 1)
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

## Why use Component?

* Components are pre-wired to render whenever a Reactivate store changes state.
* Components are React components and still support the React features you've come to love.
* Components support stateful primitives, arrays, objects, etc.

```js
import {Component,Store} from 'reactivate';
import {render} from 'react-dom';

const HelloWorld = Component({
    store: Store(),
    getInitialState() {
        return {name: 'World'};
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
    <HelloWorld></HelloWorld>,
    document.getElementById('app')
);
```

## Change Log


#### 1.5.0                      
1. Changed "setState" to "push" in preparation for new features. 
2. Changed "getState" to "value" in preparation for new features.
3. Added "History" module to record pushes.
4. Component now works through the "this.store" reference.
5. Due to history, you can now iterate over store.values() as a stream.