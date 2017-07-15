// you can use this site to adjust the file:  http://rapilabs.github.io/eslintrc-generator/

module.exports = {
    extends: ['eslint:recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['react'],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    /*globals: {

     },*/
    rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "curly": [2,"all"],
        "default-case": 2,
        "eqeqeq": 2,
        "no-alert": 2,
        "no-eval": 2,
        "no-loop-func": 2,
        "no-sequences": 2,
        "radix": 2,
        "constructor-super": 2,
        "no-var": 2,
        "prefer-const": 1,
        "prefer-spread": 1
    }
};
