import {Component} from '../lib/index';
import {expect} from 'chai';

describe('store', () => {

    it('should move React to global for now.', () => {
        expect(React).to.exist;
    });

});