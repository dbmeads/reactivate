import Reactivate from '../lib/index';
import {expect} from 'chai';

describe('store', () => {
   it('should expose React', ()=>  {
       var expected = {};
       Reactivate({
           React: expected
       });

       expect(React).to.equal(expected);
   });
});