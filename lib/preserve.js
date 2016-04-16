function preserve(value, immutable) {
    immutable = immutable === undefined ? true : false;

    if (immutable) {
        if (Array.isArray(value)) {
            return value.map(value => preserve(value));
        } else if (typeof value === 'object') {
            return Object.assign({}, value);
        }
    }

    return value;
}

export {preserve};