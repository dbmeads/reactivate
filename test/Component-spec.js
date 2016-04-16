import {Component} from '../lib/index';
import {expect} from 'chai';

describe('Component', () => {

    it('should move React to global for now.', () => {
        expect(React).to.exist;
    });

});