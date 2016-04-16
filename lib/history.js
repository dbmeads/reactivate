import {preserve} from './preserve';

function History(options) {
    options = options || {};

    var capacity = options.capacity || 1;
    var immutable = options.immutable;
    var schema = options.schema;

    var values = [];

    return {
        push(value) {
            if (schema && !tv4.validate(value, options.schema)) {
                throw tv4.error;
            }
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