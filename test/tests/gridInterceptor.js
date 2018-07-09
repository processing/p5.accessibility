define([`chai`], chai => {
    const expect = chai.expect;

    describe(`gridInterceptor Functions`, () => {

        let gi, gi2;
        it(`can be created`, () => {
            /* global GridInterceptor */
            gi = new GridInterceptor();
        });
        after(done => {
            expect(gi.noRows).to.equal(10);
            expect(gi.noCols).to.equal(10);
            expect(gi.coordLoc).to.equal({});
            done();
        })
        it(`implements the baseInterceptor prototype`, () => {
            expect(GridInterceptor.prototype).to.equal(baseInterceptor.prototype);
        });

        it(`clears variables`, () => {

        });

        it(`creates a shadow element`, () => {
            expect(gi.createShadowDOMElement(document)).to.be.a(`function`);
            gi.createShadowDOMElement(document);
        })
    })
})