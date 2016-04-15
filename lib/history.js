import {preserve} from './preserve';

function History(options) {
    options = options || {};

    var capacity = options.capacity || 1;
    var schema = options.schema;

    var values = [];

    return {
        push(value) {
            if (schema && !tv4.validate(value, options.schema)) {
                throw tv4.error;
            }
            if (values.length === capacity) {
                console.log('shifting');
                values.shift();
            }
            values.push(preserve(value));
        },
        values() {
            return preserve(values);
        },
        value() {
            return preserve(values[values.length - 1]);
        }
    };
}

export {History};