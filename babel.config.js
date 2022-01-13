/*
 * @Date: 2022-01-10 16:27:03
 * @LastEditors: 曾令宇
 * @LastEditTime: 2022-01-13 20:11:41
 * @FilePath: /project-enigma-core/babel.config.js
 */
module.exports = {
  "env": {
    "test": {
      "presets": [
        "@babel/preset-env"
      ]
    },
    "build": {
      "presets": [
        [
          "@babel/preset-env",
          {
            "modules": false,
            "loose": true
          }
        ]
      ]
    }
  }
};