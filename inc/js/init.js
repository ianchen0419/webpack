// 這是所有src的入口檔案
// 這邊只能寫引入
// 要寫功能的js去找base.js

import 'jquery';
import 'bootstrap';

import 'bootstrap/scss/bootstrap.scss';
import '../sass/_color.sass';
import '../sass/style.sass';
import '../sass/button.sass';
import '../icomoon/style.css';

var $base = require('./base.js');
window.$base = new $base();
// import {myButton, myDesc} from './base';

// myDesc.hide();
// myButton.on('click', function(e){
//     myDesc.toggle();
// });