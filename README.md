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

## Installation Notes

* Reactivate assumes you'll have your favorite version of React already installed.

## Example Apps

[Hello Reactivate!](https://github.com/dbmeads/reactivate.helloworld)

## Why use Store?

* Store is a simple subscription based state engine.
* Store optionally supports JSON Schema based validation. (http://json-schema.org/)

```js
import {Store} from 'reactivate';

const store = Store('/profile');

// You can subscribe to receive state updates
var unsubscribe = store.subscribe(state => console.log('My name is ' + state.name + '!'));

// You can update state
store.setState({name: 'Bob'});

// You can get the current state at any time
console.log(JSON.stringify(store.getState()));

// You can unsubscribe at a later time by using the function returned from subscribe
unsubscribe();
```

### JSON Schema Validation

* JSON Schema may be set on a store to provide state validation

```js

...


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
import {render} from 'react-dom';

const HelloWorld = Component({
    store: Store('/profile'),
    getInitialState() {
        return {name: 'World'};
    },
    onChange(event) {
        this.setState({
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
        return <span>Hello {this.getState().name}!</span>
    }
});

render(
    <HelloWorld></HelloWorld>,
    document.getElementById('app')
);
```