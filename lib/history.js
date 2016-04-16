import {preserve} from './preserve';

function History(options) {
    var {capacity, immutable, schema} = options;
    var changes = 0;
    var values = [];

    capacity = capacity > 1 ? capacity : 1;

    return {
        push(value) {
            if (schema && !tv4.validate(value, schema)) {
                throw tv4.error;
            }
            changes++;
            if (values.length === capacity) {
                values.shift();
            }
            values.push(preserve(value, immutable));
        },
        values() {
            return preserve(values, immutable);
        },
        value() {
            return preserve(values[values.length - 1], immutable);
        }
    };
}

export {History};