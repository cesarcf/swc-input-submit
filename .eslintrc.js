module.exports = {
    
    "extends": ["eslint:recommended", "google"],
    "parserOptions": {
        "ecmaVersion": 6
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": [
        "html"
    ],
    "rules": {
        "brace-style": "off",
        "new-cap": ["error", { "capIsNewExceptions": ["Polymer"] }],
        "no-var": "off",
        "require-jsdoc": "off",
        "linebreak-style": 0,
        "max-len": ["error", { "ignoreComments": true, "code": 100 }],
        "comma-dangle": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "block-spacing": 0
    },
    "globals": {
        "Polymer": true
    }
        
        
  };
