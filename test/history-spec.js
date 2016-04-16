import {History} from '../lib/history';
import {expect} from 'chai';
import uuid from 'uuid';

describe('History', () => {

    var history;

    beforeEach(() => {
        history = History({
            capacity: 2
        });
    });

    it('should handle multiple entries', () => {
        var profiles = [{name: 'Jim'}, {name: 'Bob'}, {name: 'Frank'}];

        profiles.forEach(profile => {
            history.push(profile);
        });

        profiles.shift();

        var values = history.values();

        expect(values.length).to.equal(2);

        for (let value of values) {
            expect(value).to.eql(profiles.shift());
        }
    });

    it('should detect change count and size', () => {
        for (let i = 0; i < 10; i++) {
            history.push({name: uuid.v4()});
        }

        expect(history.size()).to.equal(2);
        expect(history.changeCount()).to.equal(10);
    });

});