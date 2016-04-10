import Reactivate from '../lib/index';
import {expect} from 'chai';

describe('store', () => {

    var store = Reactivate.store('profile').setSchema({
        type: 'object',
        properties: {
            name: {
                type: 'string'
            }
        },
        additionalProperties: false,
        required: ['name']
    });

    it('should be immutable.', () => {
        store.setState({name: 'Frank'}).getState().name = 'Jim';

        expect(store.getState().name).to.eql('Frank');
    });

    it('should validate against JSON Schema.', () => {
        expect(() => store.setState({name: 'Don', extraProp: 'Hi!'})).to.throw(Error);
    });
});