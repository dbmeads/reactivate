# Reactivate/React'ivate

## Building/Contributing

```
# Build
$ npm run build

# Test
$ npm run test
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

* Reactivate store is unopinionated and treats all updates as state changes.
* Actions in Redux are overkill in my opinion.

```js
import Reactivate from 'reactivate';

const store = Reactivate.store('/some/store');

function callback(state) {
    console.log(state.message);
}

// You can subscribe to receive state updates
store.subscribe(callback);

// You can update state
store.setState({message: 'Hi there!'});

// You can get the current state at any time
console.log('getState returned ' + store.getState());

// You can unsubscribe from state updates as well
store.unsubscribe(callback);

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