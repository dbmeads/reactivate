# Reactivate

[![Build Status](https://img.shields.io/travis/dbmeads/reactivate/master.svg?style=flat-square)](https://travis-ci.org/dbmeads/reactivate)
[![npm version](https://img.shields.io/npm/v/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)
[![npm downloads](https://img.shields.io/npm/dm/reactivate.svg?style=flat-square)](https://www.npmjs.com/package/reactivate)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md#pull-requests)

Reactivate is a module that is a composition of many other useful modules:

1. [Rille](http://rille.io)
2. [React](https://facebook.github.io/react/)

## Quick Links

#### General
* [Installation](#installation)
* [Examples](#example-apps)
* [Change Log](#change-log)

#### Modules
* [Key](#key)
* [Entry](#entry)
* [Route](#route)
* [Store](#store)
* [Component](#component)

## Installation

`npm install reactivate --save`

## Example Apps

* [Hello Reactivate!](https://github.com/dbmeads/reactivate.helloworld)

[Back To Top](#quick-links)

## Key

Keys identify locations where data may be stored or routed.  They are similar to what you would see as a path in a file system or key in a key/value store.

```js

// You can parse a key and get an array containing it's parts
let keys = Key.parse('/some/path/that/I/should/parse');

// You can stringify the parts of a key as well
let key = Key.parse(['some','path','that','I','should','parse']);

```

[Back To Top](#quick-links)

## Entry

Entries are simply arrays where the first item (the head) is the key and the remaining items (the tail) contain data.

```js

// An example entry might look something like this

var key = '/some/key';
var data = 'Hi!';
var someOtherData = {created: '10/16/2015 10:15PM', user: 'Dan'};

var entry = [key, data, someOtherData];

```


[Back To Top](#quick-links)

## Route

* The Rille is an event router at it's core and `Route` exposes that functionality.
* You can `push` multiple pieces of data to any route.
* Routes will emit an `Entry` for each `push` that was invoked.

```js
import {Route} from 'reactivate';

// You can create new root routes easily
const route = Route();

// You can define child routes on demand
const child = route('/child/1');

// You can subscribe to routes
var unsubscribe = child.subscribe((key, value) => {
    console.log("non wildcard: " + JSON.stringify([key, value]));
});

// You can unsubscribe to routes
unsubscribe();

// You can subscribe to wildcard routes and get updates for all matching routes
route('/child/*').subscribe((...entry) => {
    console.log("wildcard: " + JSON.stringify(entry));
});

// You can push any data to a route it's subscribers will get the data
// 
child.push({message: 'Hi!'});
```

## Store

* Store is simply a route that retains the most recent entry.

```js
import {Store} from 'reactivate';

const store = Store();

// You can subscribe to receive state updates
var unsubscribe = store.subscribe((key, value) => console.log('My name is ' + value + '!'));

// You can update state
store.push('Bob');

console.log(JSON.stringify(store.entry()));

```

[Back To Top](#quick-links)

## Component

* Components are pre-wired to render whenever a Reactivate store receives data.
* Components are React components and still support the React features you've come to love.

```js
import {Component,Store} from 'reactivate';
import {render} from 'react-dom';

const HelloReactivate = Component({
    store: Store('/profile'),
    getInitialState() {
        this.store.push({name: 'Reactivate'});
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
        return <span>Hello {this.store.entry()[1].name}!</span>
    }
});

render(
    <HelloReactivate></HelloReactivate>,
    document.getElementById('app')
);
```

[Back To Top](#quick-links)

## Change Log

#### 2.0.0
1. Reactivate now uses "rille", "rille-react".
2. Reactivate is now an all in one solution for people who like all things Rille and React.

#### 1.5.8
1. "History" is now more fittingly named "Log".
2. "Log" is exposed as future functionality will utilize it directly (e.g. time machine support).

#### 1.5.4
1. Added "changeCount" to Store via history.
2. Added "size" to Store via history.
3. Added allowance for unlimited capacity when set to 0.  Default to Store is still 1.

#### 1.5.3
1. Added "immutable" option to Store.

#### 1.5.0                      
1. Changed "setState" to "push" in preparation for new features. 
2. Changed "getState" to "value" in preparation for new features.
3. Added "History" module to record pushes.
4. Component now works through the "this.store" reference.
5. Due to history, you can now iterate over store.values() as a stream.

[Back To Top](#quick-links)