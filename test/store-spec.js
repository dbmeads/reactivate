import {Store} from '../lib/index';
import {expect} from 'chai';
import uuid from 'uuid';

describe('store', () => {

    var store;

    beforeEach(() => {
        store = Store(uuid.v4());
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
        var expected = [{name: 'Jim'}, {name: 'Bob'}];
        var actual = store.setState(expected).getState();
        for (let i = 0; i < expected.length; i++) {
            expect(actual[i]).to.eql(expected[i]);
        }
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

    it('should support subscribe', done => {
        store.subscribe(state => {
            expect(state).to.equal('HI!');
            done();
        });

        store.setState('HI!');
    });

    it('should support unsubscribe', done => {
        store.subscribe(() => {
            throw new Error('failed to unsubscribe...');
        })();

        store.subscribe(state => {
            expect(state).to.equal('HI!');
            done();
        });

        store.setState('HI!');
    });
});