# Reactivate

Reactivate is an alternative to Redux or Flux.

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

# Core Concepts

### React

Keep in mind that the only thing React was designed to handle was the view.  It's the V in MVC.

## What is Reactivate and What is it In contrast to Redux?

React-ivate is all about keeping things simple.  I believe Redux does not represent simplicity.  I believe using that pattern overarchitects your applications.

One of the key things React-ivate does not use in comparison to Redux are actions or reducers which I feel are overkill IMO.  They only add confusion and complexity to your application that makes it hard for developers to read and manage.  Same thing with Reducers.  

Your UI should be very simple and generic and easy to maintain.  React-viate provides you a way to do that instead of structuring your app to be a complex Redux Application.

### It's a stream based library

#### Streams

* This means this library has nothing to do with the concept of "reducers" like in Reflux
* This framework removes reducers and actions
    * Since this library has nothing to do with reducers.  It's up to you…so you can use a reducer based pattern or some other pattern that you prefer
    * Redux also uses streams, but it carries actions with it that are passed to reducers

#### Unidirectional

* Streams tend to be and encourage Unidirectional architeuctures by Nature
* The UI only responds to state changes in streams, therefore it's uni-directional…because the view is closer to the store.  And you can have many components using the same store.  Or stores that are updated from other stores.  It's ok to have many stores as opposed to what Redux preaches as long as you have one that’s the source of truth it’s fine

## UI

### Views 

The general definition of a *view* are anything that’s representational.

A few things about views and this library:

* Reactivate.components are "views"
* The views in this library only update via streams
* They invoke actions that result in stream changes
* They aren’t bi-directional, or don't have to be
* No state is held in the views; all state is captured in streams
* Anyone who wants to know state, subscribes or looks at the current state of a stream
* Actions result in state changes within the streams, but I don’t embed actions within reducers by default;  I don’t think it’s needed;  I think it’s less friendly to most engineers;  I’m not saying people shouldn’t do it, I just think it’s overkill most of the time;  the reality is that most engineers have a hard time wrapping their heads around it.; it tends to be elegant in the same way Scala was supposed to be elegant

### Forms

One way to structure forms more efficiently in front-end code are with meta data in the form of json.

So in this pattern below, *Forms are really just represented as metadata.

For example consider this Signup Component:

```
const SignUp = Reactivate.component({
    fields: [{
        key: 'email',
        label: 'Email'
    }, {
        key: 'password',
        label: 'Password',
        type: 'password'
    }, {
        key: 'firstName',
        label: 'First Name'
    }, {
        key: 'lastName',
        label: 'Last Name'
    }, {
        key: 'gender',
        label: 'Gender',
        type: 'select',
        options: [{
            key: ''
        }, {
            key: 'F',
            label: 'Female'
        }, {
            key: 'M',
            label: 'Male'
        }]
    }, {
        key: 'dob',
        label: 'Date of Birth',
        placeholder: 'MM/DD/YYYY'
    }, {
        key: 'signUp',
        label: 'Sign Up',
        type: 'button',
        callback: client.account.signUp
    }],
    render: function () {
        return (
            <IcForm fields={this.fields} store={Reactivate.store('/forms/signUp')} />
        );
    }
});
```

First, you can clearly see that there’s no logic in this form.  It works via the API.

Notice that the submission simply triggers the API.

Do you see how callback = client.account.signUp?  That's the API.

The React component simply digests this simple json and renders a full form.  That way my component is consistent in the way it renders, etc.

## Application (UI) Logic

In Redux Application logic resides in reducers.

In React-ivate, it's up to you how you handle that logic and where it resides.  Thereofre React-vate is unopinionated in the sense that it's up to you how you handle that application logic but it should reside outside your components and outside streams.

That logic could reside in an external API or API layer in your project for example.  A completely decoupled / separate API.  Because when you think about, APIs are similar to actions.  That API  layer updates the state.  So it's no different than reducers really.  It's just that the logic is not not buried in the stream itself.

So if you have an API that handles states, then React-ivate components can invoke the API.  The API then manipulates the stream.

In other words your UI  might invoke an action…an API.  Said differently, user actions in the browser trigger events and your component will handle the event by invoking an action, or in React-ivate's case, an API layer you build or whatever it may be.

All domain is simply state in a stream. The front end only has streams for state, and the API manipulates the streams.

The API layer replaces actions in Redux.  The output of the API is reflected via state changes in streams simple as that.