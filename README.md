Webpack
===
教你如何建立一個 webpack 4 專案
[Github](https://github.com/ianchen0419/webpack)

[TOC]

# 前情提要

### 使用套件
* bootstrap 4.3.1
* jquery 3.4.1
* SASS
* icomoon

### 指令介紹
```
npm install #安裝所有套件
npm run dev-server #運行 localhost 開發環境
npm run build #將開發端的 sass / js 編譯成 bundle
npm run watch #存檔即build
```

### 檔案架構（摘要）
詳細的檔案可上 git 下載
```
.
├── index.html
├── html
│   └── test01.html
├── inc
│   ├── icomoon
│   ├── img
│   ├── js
│   │   ├── init.js（這個是入口檔案，只能寫引入）
│   │   └── base.js（這邊編寫功能用的js）
│   └── sass
│       ├── _color.sass
│       ├── button.sass
│       └── style.sass
└── webpack.config.js
```

# 正文開始

## 設置 webpack 環境
```
npm init #然後不論他問啥全下enter
```
```
npm install --save-dev webpack
```
弄完後會多了個 package.json

## 定義入口檔案 init.js
init.js裡面加入
```javascript
import './base.js';
```
順便寫一下 base.js
```javascript
//js測試
console.log('234234234');
```
### 執行 build
package.json 的 scripts 加入一段
```json
{
	"name": "webpack_test",
	"version": "1.0.0",
	"description": "webpack test project",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"build": "webpack inc/js/main.js --output dist/bundle.js --mode development" //加這裡
	},
	"author": "",
	"license": "ISC"
}
```
並且，執行終端機
（如果終端機問你要不要安裝 webpack-cli 的話，回答 yes）
```
npm run build
```
這時，會看到多了一個 dist 資料夾，裡頭有 bundle.js 這份檔案

### 使用 webpack.config.js
接下來，要將 build 的指令外放到設定檔去（webpack.config.js）
命名一個檔案，叫做 webpack.config.js

並寫入
```javascript
var path = require('path');
 
module.exports = {
    mode: 'development', //Webpack4 都要寫 mode
    entry: './inc/js/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```
然後，改寫 package.json 的 scripts
```json
{
	"name": "webpack_test",
	"version": "1.0.0",
	"description": "webpack test project",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"build": "webpack" //改成這樣
	},
	"author": "",
	"license": "ISC"
}
```
在執行一次```npm run build```，確認 bundle.js 編譯成功

## 處理 CSS
雖然專案用 sass ，但因為 icomoon 還是得處理 CSS Compile
先新增一個暫時的 css 資料夾跟檔案 fake.css

```
.
├── index.html
├── html
│   └── test01.html
├── inc
│   ├── icomoon
│   ├── img
│   ├── css（這裏）
│   │   └── fake.css（這裏）
│   ├── js
│   │   ├── init.js（這個是入口檔案，只能寫引入）
│   │   └── base.js（這邊編寫功能用的js）
│   └── sass
│       ├── _color.sass
│       ├── button.sass
│       └── style.sass
└── webpack.config.js
```
fake.css 加入以下內容（這份檔案只是測試 css compile 有沒有成功而已）
```css
body {
	background: pink;
}
```
安裝2個套件
```
npm install css-loader style-loader --save-dev
```
init.js 增加引入 fake.css
```javascript=
import './base.js';

import '../css/fake.css';（增加這行）
```
webpack.config.js多寫一個module
```javascript=
var path = require('path');
 
module.exports = {
    mode: 'development',
    entry: './inc/js/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: { //新增這坨
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
}
```
然後，執行```npm run build```確認是否成功編譯

## 使用 SASS 與打包 bundle.css
先來新增 index.html 的內容
```html
<!DOCTYPE html>
<html lang="zh_TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="format-detection" content="telephone=no" />
    <title>認識 Webpack</title>
    <link rel="stylesheet" href="dist/bundle.css" />
    <!-- detele sass -->
</head>
<body>
    <h1>認識 Webpack</h1>
    <button id="my-button">點點偶</button>
    <p id="my-desc">想單純認識 Webpack 嘛</p>
    <p>已經把bootstrap4, jquery都包進來了</p>
    <p>只能用sass歐</p>
    <p>npm watch存檔即時打包sass!!</p>
    <a href="html/test1.html">測試網頁1</a>
    <script src="dist/bundle.js"></script>
</body>
</html>
```
然後，用直接開啟他，會發現 css 直接塞進```<head>```裡面的```<style>```裡頭去了

所以這次也要用 bundle.css 的方式處理 sass

新增以下檔案
_color.sass
```sass
$primary_color: #336699
$secondary_color: #686868
```
button.sass
```sass
@import "color"
 
button
    border: 1px solid $primary_color
    color: $primary_color
    padding: 8px
    font: inherit
    cursor: pointer
    outline: none
 
    &:hover
        background-color: $secondary_color
        color: #fff
```
style.sass
```sass
@import "color"

body
    font-family: Helvetica, Arial, sans-serif
    text-align: center

h1
    border: 1px solid $primary_color
    color: $primary_color
    padding: 5px

p
    border: 1px solid $secondary_color
    padding: 20px
    margin: 30px auto
    width: 50%
    font-size: 18px
```
安裝3個套件
（mini-css-extract-plugin 是 Webpack4 適合的套件）
```
npm install sass-loader node-sass mini-css-extract-plugin --save-dev
```
修改 init.js
```javascript
import './base.js';

//import '../css/fake.css'; 不用他了
import '../sass/_color.sass'; //新增
import '../sass/style.sass'; //新增
import '../sass/button.sass'; //新增
```
修改 webpack.config.js
```javascript
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); //新增
 
module.exports = {
    mode: 'development',
    entry: './inc/js/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { //新增這坨
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [ //新增這個plugins的這坨
    	new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]
}
```
這時可以看到 dist/bundle.css 也被成功編譯出來了
## 安裝 jQuery 跟 Bootstrap 4
下載jQ
```
npm --save -dev jquery
```
在 base.js 加幾行jquery 測試
```jquery
//js測試
console.log('234234234');

//jq測試
$('#my-button').click(function(){
	$(this).fadeOut();
})
```
ini.js 加一行
```javascript
import 'jquery'; //加他

import './base.js';

import '../sass/_color.sass';
import '../sass/style.sass';
import '../sass/button.sass';
```
修改 webpack.config.js
```javascript
var path = require('path');
var webpack = require('webpack'); //新增
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
    mode: 'development',
    entry: './inc/js/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
    	new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new webpack.ProvidePlugin({ //新增這裡
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}
```
然後 jQuery 就可以運作了

接著，下載 Bootstrap 4 跟他相依的 popper.js
```
npm install --save -dev popper.js bootstrap
```
ini.js 加
```javascript
import 'jquery';
import 'bootstrap'; //加他

import './base.js';

import 'bootstrap/scss/bootstrap.scss'; //加他
import '../sass/_color.sass';
import '../sass/style.sass';
import '../sass/button.sass';
```
webpack.config.js 也加兩行
```javascript
var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
    mode: 'development',
    entry: './inc/js/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
    	new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery', //加這裡
            Popper: ['popper.js', 'default'] //加這裡
        })
    ]
}
```
執行```npm run build```
Bootstrap 也 OK 了
## 安裝 Webpack Dev Server
下載
```
npm install webpack-dev-server --save-dev
```
新增 package.json 的 scripts
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev-server": "webpack-dev-server" //這裏
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ianchen0419/webpack.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ianchen0419/webpack/issues"
  },
  "homepage": "https://github.com/ianchen0419/webpack#readme",
  "devDependencies": {
    "css-loader": "^3.0.0",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "bootstrap": "^4.3.1",
    "jquery": "^3.4.1",
    "popper.js": "^1.15.0"
  }
}
```
執行```npm run dev-server```，並且開啟 localhost:8080 ，確認是否順利

設定任意IP可訪問的東東
把剛才的 package.json 的 "dev-server" 改成這段
```json
"dev-server": "webpack-dev-server --hot --host 0.0.0.0"
```
主要是--host 0.0.0.0這裏
--hot是別的功能，但我還是加了

從今以後可以把這電腦當主機，用別的裝置連同一 WiFi 存取專案
## CSS裡面寫background-image
全部都變 base64 處理

新增 html/test1.html
```html
<!DOCTYPE html>
<html lang="zh_TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="format-detection" content="telephone=no" />
    <title>認識 Webpack</title>
    <link rel="stylesheet" href="../dist/bundle.css" />
</head>
<body>
    <h1>大家好 我是測試網頁</h1>
    <img src="../inc/img/moko.jpg" alt="html圖片測試" width="500" />
    <h5>css圖片測試(點點下面的moko)</h5>
    <div class="test" onclick="$base.hi()"></div>
    <i class="fas fa-user"></i>
    <i class="fa fa-user"></i>
    <script src="../dist/bundle.js"></script>
    <h5>icomoon測試</h5>
    <i class="icon-terminal"></i>
</body>
</html>
```
style.sass 新增一段
```
.test
    background-image: url(../img/moko.jpg);
    width: 500px
    height: 300px
    background-size: cover
    margin: 0 auto
```
安裝 url-loader
```
npm i -D url-loader
```
修改 webpack.config.js
```javascript
var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
    mode: 'development',
    entry: './inc/js/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            { //加這裡
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                loader: "url-loader"
            }
        ]
    },
    plugins: [
    	new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })
    ]
}
```
執行```npm run build```看看圖有沒有出來

## 導入 icomoon
在 inc 之下裝上 icomoon 這坨資料夾
（詳細檔案可去 git 下載）

修改init.js
```javascript
import 'jquery';
import 'bootstrap';

import './base.js';

import 'bootstrap/scss/bootstrap.scss';
import '../icomoon/style.css'; //這裏
import '../sass/_color.sass';
import '../sass/style.sass';
import '../sass/button.sass';
```
接著，`npm run build`看結果

## base.js 模組化
讓html也可以直接用 onclick 等等的方式取用 base.js

修改 init.js
```javascript
import 'jquery';
import 'bootstrap';

// import './base.js';

import 'bootstrap/scss/bootstrap.scss';
import '../icomoon/style.css';
import '../sass/_color.sass';
import '../sass/style.sass';
import '../sass/button.sass';

var $base = require('./base.js'); //新增
window.$base = new $base(); //新增
```
修改 base.js
用 module 包起來，用 this 命名 function
```javascript
module.exports = function $base() {
	//js測試
	console.log('234234234');

	//jq測試
	$('#my-button').click(function(){
		$(this).fadeOut();
	})

	//function測試
	this.hi=function(){
		console.log('hihiihihihihihihi');
	}
}
```
接著，`npm run build`看結果

從今以後，可以在html檔案裡，直接使用hi()這個function了。
例如：
```html
<div onclick="$base.hi()">點點我</div>
```
## Webpack watch 檔案即存即編譯

在 package.json 加一行 script
```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch", //這裏
    "dev-server": "webpack-dev-server --hot --host 0.0.0.0"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ianchen0419/webpack.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ianchen0419/webpack/issues"
  },
  "homepage": "https://github.com/ianchen0419/webpack#readme",
  "devDependencies": {
    "css-loader": "^3.0.0",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^2.0.1",
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "bootstrap": "^4.3.1",
    "jquery": "^3.4.1",
    "popper.js": "^1.15.0"
  }
}
```
之後，執行```webpack watch```他就會隨時監控你的檔案，只要一存檔，就 compile



###### 參考資料
* http://www.mrmu.com.tw/2017/08/18/webpack-tutorial/
* http://www.mrmu.com.tw/2017/08/18/webpack-tutorial2-css-scss/
* https://qiita.com/riversun/items/d27f6d3ab7aaa119deab