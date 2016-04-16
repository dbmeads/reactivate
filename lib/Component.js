function Component(spec) {
    const {getInitialState, componentDidMount, componentWillUnmount} = spec;

    return React.createClass(Object.assign(spec, {
        getInitialState() {
            var store = this.store = (this.props && this.props.store) || spec.store;
            var state = getInitialState ? getInitialState.call(this) : null;
            if (store) {
                if (state !== null) {
                    store.push(state);
                }
                return null;
            }
            return state;
        },
        componentDidMount() {
            if (this.store) {
                this.unsubscribe = this.store.subscribe(function () {
                    this.forceUpdate();
                }.bind(this));
            }

            return componentDidMount ? componentDidMount.call(this) : undefined;
        },
        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
            return componentWillUnmount ? componentWillUnmount.call(this) : undefined;
        }
    }));
};

export {Component};