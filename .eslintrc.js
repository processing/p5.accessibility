module.exports = {
    env: {
        browser: true,
        amd: true,
        es6: true
    },
    extends: ['eslint:recommended', 'p5js'],
    plugins: [],
    rules: {
        'no-cond-assign': [2, 'except-parens'],
        eqeqeq: ['error', 'smart'],
        'no-global-assign': 'off',
        'no-use-before-define': [
            2,
            {
                functions: false,
                variables: false
            }
        ],
        'new-cap': 0,
        'no-caller': 2,
        'no-undef': 2,
        'no-unused-vars': ['error', {
            args: 'none',
            vars: "local"
        }],
        'no-empty': ['error', {
            allowEmptyCatch: true
        }],
        'no-console': 'off',
        'no-var': 'error',
        'quotes': ["error", "backtick"],
    }
};