define([`chai`], chai => {
    const expect = chai.expect;

    /* global describe */
    describe(`Base Entity`, () => {
        let be;
        /* global it */
        it(`can be created`, () => {
            /* global BaseEntity */
            be = new BaseEntity();
            expect(be.type).to.be.a(`string`).to.not.have.length(0);
            expect(be.location).to.be.a(`string`).and.to.have.length(0);
            expect(be.coordinates).to.be.a(`string`).and.to.have.length(0);
            expect(be.isMember).to.be.a(`function`);
        });

        it(`returns its attributes`, () => {
            expect(be.getAttributes()).to.be.an(`object`).and.to.deep.equal({
                be.type,
                be.location,
                be.coordinates
            });
        });

        // it(`clears variables`, () => {
        //     ti.drawObject = ti.clearVariables(ti.drawObject);
        //     expect(ti.drawObject).to.be.an(`object`);
        //     expect(ti.drawObject.objectTypeCount).to.be.an(`object`).and.to.be.deep.equal({});
        //     expect(ti.drawObject.objectArray).to.be.an(`array`).and.have.lengthOf(0);
        //     expect(ti.drawObject.objectCount).to.be.a(`number`).and.to.equal(0);
        //     expect(ti.isCleared).to.be.ok;
        // });
    })
})