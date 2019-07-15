// 這是所有src的入口檔案
// 這邊只能寫引入
// 要寫功能的js去找base.js

import 'jquery';
import 'webpack-jquery-ui';
import 'primeui';

import '../icomoon/style.css';
import 'font-awesome/css/font-awesome.css';
import 'webpack-jquery-ui/css';
import 'primeui/themes/omega/theme.css';
import 'primeui/primeui.css'

import '../sass/_color.sass';
import '../sass/style.sass';
import '../sass/button.sass';


var $base = require('./base.js');
window.$base = new $base();