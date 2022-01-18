# 起步

## 安装

### NPM（推荐）

```bash
yarn add project-enigma-core # npm install project-enigma-core
```

### 通过文件

[下载地址](https://github.com/diaz-zeng/project-enigma-core/releases)

```html
<script src="project-enigma-core.umd.min.js"></script> 
<!--将会暴露EnigmaCore对象到全局-->
```

## 引入

``` js
import { Enigma } from 'project-enigma-core'; //按需引入
import * as EnigmaCore from 'project-enigma-core'; //全量引入（不建议）
const EnigmaCore = require('project-enigma-core'); //CommonJS
```

## 基本用法

```js
const instance = new Enigma();
instance.setWheelsPosition([0,25,20]).input("HELLO WORLD!!!");
// return: TCMCT IHCKX!!!
instance.setWheelsPosition([0,25,20]).input("TCMCT IHCKX!!!");
// return: HELLO WORLD!!!
```

