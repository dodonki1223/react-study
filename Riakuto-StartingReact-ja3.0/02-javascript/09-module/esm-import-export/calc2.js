/*
    モジュールの集約したものを読み込んでいる記述
      - インポート文がスッキリする
      - 循環依存を回避するために使える
        - CommonJS 形式で循環依存が発生する例
              main.js      var A = require('./a');
              →→a.js     var B = require('./b');
              →→→→b.js var A = require('./a');
              →→→→b.js 読み込み完了
              →→a.js 読み込み完了
            a.js の読み込みが完了する前にb.jsの中で a.js が読み込まれています
            a.js の読み込みは完了していないので、b.js の3行目では空のオブジェクトが返っています
 */

import { add, multiply, TWO, TEN, German } from './modules/index.js';

console.log(add(5, TWO));                        // 7
console.log(multiply(4, TEN));                   // 40
console.log(multiply(German.FUNF, German.DREI)); // 15
