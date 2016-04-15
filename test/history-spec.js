import {History} from '../lib/history';
import {expect} from 'chai';

describe('History', () => {

    it('should handle multiple entries', () => {
        var profiles = [{name: 'Jim'}, {name: 'Bob'}, {name: 'Frank'}];

        var history = History({
            capacity: 2
        });

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

});