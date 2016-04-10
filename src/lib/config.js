import tv4 from 'tv4';

const config = {
    immutable: true
};

const schema = {
    type: 'object',
    properties: {
        immutable: {
            type: 'boolean'
        },
        React: {
            type: 'object'
        }
    },
    required: ['React']
};

var initialized = false;

export default options => {
    if (options) {
        if(initialized) {
            throw new Error('Reconfiguration not allowed.');
        } else if (tv4.validate(options, schema)) {
            initialized = true;
            return Object.assign(config, options);
        } else {
            throw tv4.error;
        }
    }
    return Object.assign({}, config);
};