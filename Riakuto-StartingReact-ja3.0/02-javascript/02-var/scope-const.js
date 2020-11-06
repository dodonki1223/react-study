/*
    ＜varの問題点：スコープ単位が関数＞
      - 一般的なプログラミング言語と一緒で if 文内で宣言した内容はそのままになる（ブロック単位になる）
      - 結果として「0, 50, リファレンスエラー」と表示される
 */

const n = 0;

if (true) {
  const n = 50;
  const m = 100;
  console.log(n);
}

console.log(n);
console.log(m);
