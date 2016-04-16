function Component(spec) {
    const {getInitialState, componentDidMount, componentWillUnmount} = spec;

    return React.createClass(Object.assign({
        getInitialState() {
            var store = this.store = (this.props && this.props.store) || spec.store;
            var state = getInitialState.call(this) || null;
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
            return componentDidMount.call(this);
        },
        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
            return componentWillUnmount.call(this);
        }
    }, spec));
};

export {Component};