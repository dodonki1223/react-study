/*
    ＜varの問題点：スコープ単位が関数＞
      - if 文内で宣言した内容が if 文以降の内容でも表示されてしまう
      - 結果として「50, 50, 100」と表示される……実にキモい
 */

var n = 0;

if (true) {
  var n = 50;
  var m = 100;
  console.log(n);
}

console.log(n);
console.log(m);
