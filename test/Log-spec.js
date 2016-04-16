import {Log} from '../lib/Log';
import {expect} from 'chai';
import uuid from 'uuid';

describe('Log', () => {

    var log;

    beforeEach(() => {
        log = Log({
            capacity: 2
        });
    });

    it('should handle multiple entries', () => {
        var profiles = [{name: 'Jim'}, {name: 'Bob'}, {name: 'Frank'}];

        profiles.forEach(profile => {
            log.push(profile);
        });

        profiles.shift();

        var values = log.values();

        expect(values.length).to.equal(2);

        for (let value of values) {
            expect(value).to.eql(profiles.shift());
        }
    });

    it('should detect change count and size', () => {
        for (let i = 0; i < 10; i++) {
            log.push({name: uuid.v4()});
        }

        expect(log.size()).to.equal(2);
        expect(log.changeCount()).to.equal(10);
    });

});