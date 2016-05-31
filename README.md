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
* [Entry](#entry)
* [Key](#key)
* [Route](#route)
* [Store](#store)
* [Component](#component)

## Installation

`npm install reactivate --save`

## Example Apps

* [Hello Reactivate!](https://github.com/dbmeads/reactivate.helloworld)

[Back To Top](#quick-links)

## Entry

Entry provides some convenience functions for working with entries.  An entry is an array where the head is the key and the tail contains values (e.g.: ['/some/key', value1, value2, ...]).


```js

import {Entry} from 'rille';

// Returns the array of values for an entry
var values = Entry.values(entry);

// Returns the key of an entry
var key = Entry.key(entry);

```

[Back To Top](#quick-links)

## Key

Key provides convenience functions for parsing and stringify'ing keys.

```js

import {Key} from 'rille';

// Converts string format into array format
var keys = Key.parse('/i/am/a/key');

// Converts array format into string format
var key = Key.stringify(['i','am','a','key']);

```

[Back To Top](#quick-links)

## Route

Route is the core of Rille and provides support for routing entries (key + values) to appropriate subscribers.

```js

import {Route} from 'rille';

// Create a route
const route = Route();

// Subscribe to receive updates to a route
route.subscribe((key, ...values) => {
    console.log('My key is ' + key + ' and my values are ' + JSON.stringify(values));
});

// Subscribe to receive updates on a child route
route('/child/1').subscribe((key, ...values) => {
    console.log('My key is ' + key + ' and my values are ' + JSON.stringify(values));
});

// Subscribe to receive updates for all child of a route (a wildcard route)
route('/child/*').subscribe((key, ...values) => {
    console.log('Wildcard Route: My key is ' + key + ' and my values are ' + JSON.stringify(values));
});
                 
// Push a value(s) to a route
route.push('Hi!');

// Push value(s) of any type to a route
route.push('Hi!', {user: 'Frank'}); 

// Push value(s) to a child route
route('/child/1').push('Hi child!');

```

[Back To Top](#quick-links)

## Store

Store is a route that retains it's most recent entry.

```js

import {Store} from 'rille';

// Create a store just like a route
const store = Store();

var child = store('/some/child');

// Subscribe to a store just like a route
child.subscribe((...entry) => {
    console.log('received ' + JSON.stringify(entry));
});

// Push to a store just like a route
child.push('Hello child!');

// Get the most recent entry
var entry = child.entry();
console.log('most recent entry ' + JSON.stringify(entry));

// Get the array of values for the most recent entry
var values = child.values();
console.log('most recent values ' + JSON.stringify(values));

// Get a particular value from the most recent entry
console.log('message is "' + child.values(0) + '".');

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