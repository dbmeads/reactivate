import Reactivate from '../lib/index';
import {expect} from 'chai';
import uuid from 'uuid';

describe('store', () => {

    var store;

    beforeEach(() => {
        store = Reactivate.store(uuid.v4());
    });

    it('should be immutable.', () => {
        store.setState({name: 'Frank'}).getState().name = 'Jim';

        expect(store.getState().name).to.eql('Frank');
    });

    it('should validate against JSON Schema.', () => {
        store.setSchema({
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                }
            },
            additionalProperties: false,
            required: ['name']
        });

        expect(() => store.setState({name: 'Don', extraProp: 'Hi!'})).to.throw(Error);
    });

    it('should handle arrays', () => {
        expect(store.setState([{name: 'Jim'}, {name: 'Bob'}]).getState().length).to.eql(2);
    });

    it('should handle strings', () => {
        expect(store.setState('hi').getState()).to.equal('hi');
    });

    it('should handle numbers', () => {
        expect(store.setState(1).getState()).to.equal(1);
    });

    it('should handle booleans', () => {
        expect(store.setState(false).getState()).to.eql(false);
    });
});