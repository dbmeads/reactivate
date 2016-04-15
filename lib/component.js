function pluck(src, ...keys) {
    var obj = {};
    keys.forEach(key => {
        if (src && src[key]) {
            obj[key] = src[key];
            delete src[key];
        }
    });
    return (context, key, defaultValue) => {
        if (obj[key]) {
            return obj[key].call(context);
        }
        return defaultValue;
    };
}

function Component(spec) {
    var callOnSpec = pluck(spec, 'getInitialState', 'componentDidMount', 'componentWillUnmount');

    return React.createClass(Object.assign({
        getInitialState() {
            var store = this.store = (this.props && this.props.store) || spec.store;
            var state = callOnSpec(this, 'getInitialState', null);
            if (store) {
                if (state !== null) {
                    store.push(state);
                }
                return null;
            } else {
                return state;
            }
        },
        componentDidMount() {
            if (this.store) {
                this.unsubscribe = this.store.subscribe(function () {
                    this.forceUpdate();
                }.bind(this));
            }
            return callOnSpec(this, 'componentDidMount');
        },
        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
            return callOnSpec(this, 'componentWillUnmount');
        }
    }, spec));
};

export {Component};