import Reactivate from '../lib/index';
import {expect} from 'chai';

describe('store', () => {

    var store = Reactivate.store('profile');

    it('should be immutable.', () => {
        store.setState({name: 'Frank'});

        store.getState().name = 'Jim';

        expect(store.getState().name).to.eql('Frank');
    });
});