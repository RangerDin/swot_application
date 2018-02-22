module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react', 'prettier'],
    settings: {
        react: {
            pragma: 'h'
        }
    },
    rules: {
        indent: 0,
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single', 'avoid-escape'],
        semi: ['error', 'always'],
        'react/prop-types': [0],
        'prettier/prettier': 'error'
    }
};
