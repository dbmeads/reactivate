import Reactivate from '../lib/index';
import {expect} from 'chai';

describe('store', () => {

    var store = Reactivate.store('profile');

    it('should be immutable.', () => {
        var state = {name: 'Frank'};

        store.setState(state);

        state.name = 'Jim';

        expect(store.getState().name).to.eql('Frank');
    });
});