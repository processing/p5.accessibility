require.config({
    baseUrl: `./`,
    paths: {
        'lib': `../lib`,
        'chai': `./testDeps/chai`
    }
});

const allTests = [
    `tests/gridInterceptor`
];

require(allTests, () => {
    /*  global mocha */
    mocha.run();
});