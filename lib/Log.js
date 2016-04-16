import {preserve} from './util';

function Log(options) {
    var {capacity, immutable, schema} = options;
    var changes = 0;
    var values = [];

    return {
        push(value) {
            if (schema && !tv4.validate(value, schema)) {
                throw tv4.error;
            }
            changes++;
            if (capacity > 0 && values.length === capacity) {
                values.shift();
            }
            values.push(preserve(value, immutable));
        },
        values() {
            return preserve(values, immutable);
        },
        value() {
            return preserve(values[values.length - 1], immutable);
        },
        changeCount() {
            return changes;
        },
        size() {
            return values.length;
        }
    };
}

export {Log};