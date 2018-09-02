define([`chai`], chai => {
  const expect = chai.expect;

  /* global describe */
  describe(`Interceptor Helper Functions`, () => {
    /* global it */
    it(`can recursively merge objects`, () => {
      const object1 = {
        a: 1,
        b: 2
      };
      const object2 = {
        c: 3,
        b: 4
      };
      /* global mergeObjRecursive */
      expect(mergeObjRecursive(object1, object2)).to.deep.equal({
        a: 1,
        b: 6,
        c: 3
      });
    });
  })
})