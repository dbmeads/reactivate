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

export default spec => {
    var callOnSpec = pluck(spec, 'getInitialState', 'componentDidMount', 'componentWillUnmount');

    return React.createClass(Object.assign({
        getInitialState() {
            var store = this.store = (this.props && this.props.store) || spec.store;
            if (store) {
                store.setState(callOnSpec(this, 'getInitialState', store.getState()));
                return store.getState();
            }
            return null;
        },
        componentDidMount() {
            if (this.store) {
                this.callback = function () {
                    this.forceUpdate();
                }.bind(this);
                this.store.subscribe(this.callback);
            }
            return callOnSpec(this, 'componentDidMount');
        },
        componentWillUnmount() {
            if (this.store) {
                this.store.unsubscribe(this.callback);
            }
            return callOnSpec(this, 'componentWillUnmount');
        }
    }, spec));
};