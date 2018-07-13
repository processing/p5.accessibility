define([`chai`], chai => {
    const expect = chai.expect;

    /* global describe */
    describe(`gridInterceptor Functions`, () => {
        let gi, shadowDOMElement;
        /* global it */
        it(`can be created`, () => {
            /* global GridInterceptor */
            gi = new GridInterceptor();
            expect(gi.noRows).to.equal(10);
            expect(gi.noCols).to.equal(10);
            expect(gi.coordLoc).to.be.an(`object`);
        });

        it(`implements the baseInterceptor prototype`, () => {
            expect(GridInterceptor.prototype).to.have.property(`getColorName`)
        });

        it(`clears variables`, () => {
            gi.drawObject = gi.clearVariables(gi.drawObject);
            expect(gi.drawObject.objectArray).to.be.an(`array`).and.have.lengthOf(0);
            expect(gi.isCleared).to.equal(true);
        });

        it(`creates a shadow element`, () => {
            // gi.createShadowDOMElement(document);
            // expect(shadowDOMElement).to.be.a(`object`);
        })
    })
})