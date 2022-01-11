/*
 * @Date: 2022-01-10 16:20:50
 * @LastEditors: 曾令宇
 * @LastEditTime: 2022-01-10 17:31:30
 * @FilePath: /project-enigma-core/.eslintrc.js
 */
module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    },
};
