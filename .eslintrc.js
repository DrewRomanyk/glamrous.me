module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "installedESLint": true,
    "parserOptions": {
	"ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
	"react/jsx-uses-react": "error",
	"react/jsx-uses-vars": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
	    { "avoidEscape": true },
        ],
        "semi": [
            "error",
            "always"
        ],
	"no-mixed-spaces-and-tabs": [
	    "error",
            "smart-tabs",
	],
	"no-console": [
	    "error",
	    { allow: [ "warn", "error" ] }
	],
    }
};
