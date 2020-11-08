/*
    ＜デフォルト引数について＞
      - JavaScript ではデフォルト引数の設定は複数の引数のどれに対しても可能だけど、きれいなコードを書くことを心がけるなら
        デフォルト値の設定がある引数はいちばん後ろから置いていくほうがいい
        なぜなら関数の設計として、重要な引数ほど前に持ってくるべきで、デフォルト値があって省略できる引数は重要性が低いはずだから
 */

// m に関してはデフォルト値に 2 が設定されている
// 「**」は 冪乗演算子 ビルトインオブジェクトによる Math.pow() でも同じことができたがこっちのほうがわかりやすい
const raise = (n, m = 2) => n ** m;

console.log(raise(2, 3)); // 2の3乗(8)
console.log(raise(3));    // 3の2乗(9)

/*
    ＜Rest Parameters(残余引数)について＞
 */

// 同時に可変長引数も実現している
const showNames = (a, b, ...rest) => {
  console.log(a);
  console.log(b);
  console.log(rest);
}

// 出力結果としては以下のようになる
// John
// Jane
// ['Johnny', 'Jenny', 'Julia']
showNames('John', 'Jane', 'Johnny', 'Jenny', 'Julia');

// 第２引数以降だけでなく、第１引数でもしていることができる
const showAllArgs = (...args) => {
  console.log(args);
}

console.log(showAllArgs('A', 'B', 'C', 'D')); // ['A', 'B', 'C', 'D']

// 数に限りのある残余引数設定
const sum = (i, ...[j, k, l]) => i + j + k + l;

console.log(sum(1, 2, 3, 4));    // 10
// 数に合わないものは捨てられる
console.log(sum(1, 1, 1, 1, 1)); // 4
