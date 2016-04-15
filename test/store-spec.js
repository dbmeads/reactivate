import {Store} from '../lib/index';
import {expect} from 'chai';

describe('Store', () => {

    var store;

    beforeEach(() => {
        store = Store();
    });

    it('should be immutable.', () => {
        store.push({name: 'Frank'}).value().name = 'Jim';

        expect(store.value().name).to.eql('Frank');
    });

    it('should validate against JSON Schema.', () => {
        store = Store({
            schema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    }
                },
                additionalProperties: false,
                required: ['name']
            }
        });

        expect(() => store.push({name: 'Don', extraProp: 'Hi!'})).to.throw(Error);
    });

    it('should handle arrays', () => {
        var expected = [{name: 'Jim'}, {name: 'Bob'}];
        var actual = store.push(expected).value();
        for (let i = 0; i < expected.length; i++) {
            expect(actual[i]).to.eql(expected[i]);
        }
    });

    it('should handle strings', () => {
        expect(store.push('hi').value()).to.equal('hi');
    });

    it('should handle numbers', () => {
        expect(store.push(1).value()).to.equal(1);
    });

    it('should handle booleans', () => {
        expect(store.push(false).value()).to.eql(false);
    });

    it('should support subscribe', done => {
        store.subscribe(state => {
            expect(state).to.equal('HI!');
            done();
        });

        store.push('HI!');
    });

    it('should support unsubscribe', done => {
        store.subscribe(() => {
            throw new Error('failed to unsubscribe...');
        })();

        store.subscribe(state => {
            expect(state).to.equal('HI!');
            done();
        });

        store.push('HI!');
    });
});