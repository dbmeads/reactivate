# Reactivate/React'ivate

## Building/Contributing

```
# Build
$ npm run build

# Test
$ npm test
```

## Configuration

* From the entry point in your appication, run Reactivate and pass in the version of React you wish to use.

```js
import React from 'react';
import Reactivate from 'reactivate';

Reactivate({
    React: React
});

```

## Why use Reactivate.store?

* Reactivate store is a simple subscription based state engine.
* Reactivate store supports JSON Schema based validation on any store. (http://json-schema.org/)

```js
import Reactivate from 'reactivate';

const store = Reactivate.store('/profile');

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

## Why use Reactivate.component?

* Reactivate components are pre-wired to update whenever a Reactivate store changes state.
* Reactivate components are React components with a sprinkling of magic.

```js
import Reactivate from 'reactivate';
import { render } from 'react-dom';

const store = Reactivate.store('/helloworld');

const HelloWorld = Reactivate.component({
    render: function() {
        return (
            <div><span>Hello {this.store.getState()}!</span></div>
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