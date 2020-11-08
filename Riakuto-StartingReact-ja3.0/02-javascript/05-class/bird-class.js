/*
    ＜JavaScriptのクラスについて＞
      - 厳密な意味でのクラスは存在していない(クラスを作っているかのように見せかけてるシンタックスシュガー)
        - シンタックスシュガー、日本語で糖衣構文。既存の構文を別の構文・記法で記述できるようにしたもの
          - 複雑かつわかりにくい「苦い」構文で実現される処理をよりシンプルでわかりやすい「甘い」書き方で同じことができるようにしたもの
      - クラスはコンストラクタ関数（プロトタイプオブジェクトを継承してオブジェクトインスタンスを生成するための独立した関数のこと）
 */

class Bird {
  constructor(name) {
    this.name = name;
  }

  chirp = () => {
    console.log(`${this.name}が鳴きました`);
  }

  static explain = (name) => {
    console.log(`${name}は翼があって卵を生みます`);
  };
}

class FlyableBird extends Bird {
  constructor(name) {
    super(name);
  }

  // メンバーメソッドはアロー関数式で書く、ただし constructor はアロー関数式では書けない
  //   fly() { ... }, fly = () => { ... } のどっちの書き方でもできる
  fly = () => {
    console.log(`${this.name}が飛びました`);
  };
}

const penguin = new Bird('ペンギン');
penguin.chirp();                      // ペンギンが鳴きました
// Bird.chirp();                      // これはもちろんエラーになる
Bird.explain('カラス');               // カラスは翼があって卵を生みます

const hawk = new FlyableBird('タカ');
hawk.fly();                           // タカが飛びました

/*
    ＜プロトタイプベースのオブジェクト指向とは＞
      - オブジェクト指向には「クラスベース」、「プロトタイプベース」の２つがある
      - プロトタイプベースとは？
        - オブジェクトは直接、他のオブジェクトを継承する。そのときの継承元になったオブジェクトのことを「プロトタイプ」と呼ぶ
        - 結局、クラスベースとプロトタイプベースだと何が違うの？
          - クラスは実態を持たない抽象概念、プロトタイプは実態のあるオブジェクト
      - コンストラクタ関数
          - それぞれに設定されているプロトタイプオブジェクトを継承して、新しくオブジェクトインスタンスを生成するための関数
          - ビルドインオブジェクトの Array も String もコード上からアクセスできているのはコンストラクタ関数だった
      - プリミティブ型のラッパーオブジェクト値がそれぞれ使えているメソッドはオブジェクトインスタンスの継承元であるプロトタイプが持っているメソッドを継承したもの
      - プロトタイプベースの強み
        - 直にメソッドを追加したり削除したりできる、変更が既に生成済みのインスタンスにも即時反映される
        - ※クラスベースではあまり聞いたことがない
 */

// 各プロジェクト値のプロトタイプが __proto__ という共通のプロパティに格納されている
console.log([1, 2, 3].__proto__);      // 配列オブジェクト   の継承元プロトタイプは [] 空配列
console.log({ foo: 'bar' }.__proto__); // オブジェクト       の継承元プロトタイプは {} 空オブジェクト
console.log('JavaScript'.__proto__);   // 文字列オブジェクト の継承元プロトタイプは '' 空文字列
console.log((65536).__proto__);        // 数値オブジェクト   の継承元プロトタイプは 0

// Array について
// typeof は オブジェクトまたはプリミティブ型を表す式を返す
const array = new Array(1, 2, 3);
console.log(array);               // [1, 2, 3]
console.log(typeof Array);        // 'function' ---> Array はコンストラクタ関数
console.log(Array.prototype);     // []         ---> Array に設定されているプロトタイプは []

// String について
const str = new String('JavaScript');
console.log(str);                  // [String: 'JavaScript']
console.log(typeof String);        // 'function'   ---> String はコンストラクタ関数
console.log(String.prototype);     // [String: ''] ---> String に設定されているプロトタイプは ''

// プリミティブ型のラッパーオブジェクトについて
//   プリミティブ型のラッパーオブジェクト値がそれぞれ使えているメソッドはオブジェクトインスタンスの継承元である
//   プロトタイプが持っているメソッドを継承したもの（プロトタイプメソッド）
console.log(Number.prototype.toString());                  // '0'
console.log((100).toString());                             // '100'        ---> Nubmer.prototype.toString() を継承したもの

console.log(String.prototype.replace('', 'blank string')); // 'blank string'
console.log('LiveScript'.replace('Live', 'Java'));         // 'JavaScript' ---> String.prototype.replace() を継承したもの

// JavaScript ではあらゆるオブジェクトは何らかのプロトタイプを継承している
//   プロトタイプチェーンは最終的には {} → null に到達する
//   ※Object.prototype.__proto__ は 14.4 以前で実行すること（14.5だと挙動が異なるため）
console.log(hawk.__proto__);                               // FlyableBird {}
console.log(hawk.__proto__.__proto__);                     // Bird {}
console.log(hawk.__proto__.__proto__.__proto__);           // {}
console.log(hawk.__proto__.__proto__.__proto__.__proto__); // null

// FlyableBird のプロトタイプには toString() というメソッドは無かった
// 継承元である Bird のプロトタイプにもないので、最終的に Object.prototype に行き着いてその toString() が実行される
console.log(Object.prototype.toString());
console.log(hawk.toString());

// Bird のプロトタイプに toString() メソッドを定義したらそれが使われるようになる
Bird.prototype.toString = function () { return `Bird { name: ${this.name} }`; };
console.log(hawk.toString());

// Bird に定義した toString() メソッドを削除したら元の Object.prototype.toString() がまた使われるようになった
delete Bird.prototype.toString;
console.log(hawk.toString());


console.log(FlyableBird.prototype);
console.log(Bird.prototype);
console.log(Bird.__proto__);
