/*
    ＜this の中身４つのパターン＞
      - (1) new 演算子をつけて呼び出した時：新規生成されるオブジェクト
      - (2) メソッドとして実行された時    ：その所属するオブジェクト
      - (3) 1・2以外の関数[非Strictモード]：グローバルオブジェクト
      - (4) 1・2以外の関数[Strictモード]  ：undefined
 */

/*
    (1) new 演算子をつけて呼び出した時：新規生成されるオブジェクト
      - new 演算子はあらゆる関数につけて実行することができる
      - 関数の prototype オブジェクトをコピーして新規にオブジェクトを作る、次にそれを関数に暗黙の引数 this として
        渡し、最後にその関数が return this で終わっていない場合は代わりにそれを実行している
 */

// dump 関数
const dump = function () { console.log('`this` is', this); };
console.log(dump);           // `this` is dump {}

// dump 関数の prototype を調べる
console.log(dump.prototype); // dump {}

// 関数にnew演算子を使う(dump.prototype を同じであることがわかる)
const obj = new dump();
console.log(obj);            // dump {}

// obj は dump.prototype とアドレスを共有しない新規のオブジェクトになっている
const result = obj !== dump.prototype;
console.log(result);         // true

/*
    (2) メソッドとして実行された時    ：その所属するオブジェクト
      - メソッドとして実行された場合、そのアクセス演算子「.」の前のオブジェクトが this として渡される
 */

const foo = {
  name: 'Foo Object',
  dump() {
    console.log(this);
  },
};

// 出力結果が同じである
foo.dump();       // { name: 'Foo Object', dump: [Function: dump] }
console.log(foo); // { name: 'Foo Object', dump: [Function: dump] }

/*
    (3) 1・2以外の関数[非Strictモード]：グローバルオブジェクト
      - JavaScript におけるトップレベルの実行環境は必ず何らかの「グローバルオブジェクト」になっている
        デフォルトでthisはそのグローバルオブジェクトを参照している
        - Node.js であれば global オブジェクト
        - ブラウザであれば window オブジェクト
      - JavaScript では、this がグローバル変数であるため this が参照できる
 */

// メソッドではない関数、および new 演算子をつけずに実行されるあらゆる関数は、このグローバル
// オブジェクトが this として引き渡されることになる
const dump2 = function () { console.log(this); };
dump2();

/*
    (4) 1・2以外の関数[Strictモード]  ：undefined
      - Strict モードはファイルの戦闘業や関数の最初に `use strict` を記述することで使用することができる
        - JavaScript の古い仕様に含まれる幾つかの安全ではない構文や機能を禁止するモード
        - 関数がメソッドでない、つまり任意のオブジェクトのコンテキストに無かった場合、this には undefined が入るようになる
 */

// 以下のサンプルは簡単にグローバル汚染が起きてしまっている例

// 出力結果を確認すると グローバルオブジェクトに name プロパティが追加されていることがわかる
const Person = function (name) { this.name = name; return this; };
console.log(Person('somebody'));

// グローバルオブジェクトに name プロパティが追加されているため name を実行することができる
console.log(name); // somebody

// Strict モードを使用した場合の挙動

// this が undefined になる
// > const Person = function (name) { this.name = name; return this; };
// > Person('somebody');
// Uncaught TypeError: Cannot set property 'name' of undefined
//   at Person (repl:1:57)

// ------------------------------------------------------------------------------------------

// クラス構文のコンストラクタも new 演算子をつけないと実行できないようになっている
// > class Foo { constructor() { console.log('`this` is', this); } }
// > Foo();
// Uncaught TypeError: Class constructor Foo cannot be invoked without 'new' > new Foo();
// `this` is Foo {}

/*
    this の挙動の問題点と対処法
      - https://codesandbox.io/s/this-behavior-vrd53?file=/src/App.js:437-446 このURLの挙動を言葉で説明できること
      - 結論……
        - this はクラス構文内でしか使わない
        - クラス構文内では、メソッドを含めたあらゆる関数の定義をアロー関数式で行う
 */

class Person2 {
  constructor(name) {
    this.name = name;
  }

  greet() {
    const doIt = function() {
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }
}

// 実行すると「TypeError: Cannot read property 'name' of undefined」エラーがでてしまう
// メソッド内で定義された関数はただの関数で、そのオブジェクトの処理に this は存在しない
// JavaScript での this はあらゆる関数に暗黙的に引き渡されるため、doIt() では undefined に書き換えられてしまう
const minky = new Person2('Momo');
// 実行する時はコメントを外してね！
// minky.greet();


// ではどうすれば……以下の４つの方法が存在する！
//   1. bind() で関数に this を束縛する
//   2. call() または apply() を使って this を指定して実行する
//   3. this の値を一時変数に代入する
//   4. アロー関数式で定義する

class Person3 {
  constructor(name) {  
    this.name = name;
  }

  /*
      1. bind() で関数に this を束縛する
        - Function.prototype.bind(thisArg) は thisArg に渡した値を this に固定した新しい関数を生成するメソッド
        - greet1() 自身の this を doIt() に束縛した bindedDoIt() という関数を作り実行している
   */
  greet1() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    // 関数に this を束縛
    const bindedDoIt = doIt.bind(this);
    bindedDoIt();
  }

  /*
      2. call() または apply() を使って this を指定して実行する
        - Function.prototype.call(thisArg) という任意のオブジェクトを this に設定して関数を呼び出すメソッドを使用している
        - greet2() の this を引き渡して doIt() を実行している
   */
  greet2() {
    const doIt = function () {
      console.log(`Hi, I'm ${this.name}`);
    };
    // this を指定して実行
    doIt.call(this);
  }

  /*
      3. this の値を一時変数に代入する
        - this が undefined に置き換わってしまうので 一時変数の _this に中身を移し替えて実行する
   */
  greet3() {
    // _this に値を移し替える
    const _this = this;
    const doIt = function () {
      console.log(`Hi, I'm ${_this.name}`);
    };
    doIt();
  }

  /*
      4. アロー関数式で定義する
        - アロー関数は暗黙の引数としての this を持たず、 this を参照すると関数の外のスコープの this の値がそのまま使われる
        - アロー関数がクラスのインスタンスメソッドとして定義されたときだけ、内部で 3 の一時変数による this の移し替えをしている
        - アロー関数は入れ子にしても、アロー関数の中で参照されている this が指すものは変わらない
   */
  greet4() {
    // アロー関数式で定義
    const doIt = () => {
      // ここで使用されている this は greet4() の this が参照されている
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }

  // メソッド自身もアロー関数式で定義
  //   greet5() 自身の this は undefined になるのが妥当だが内部で一時変数による this の移し替えを行っている
  //   なんで 「greet5() 自身の this は undefined になるのが妥当」なのか？
  //     アロー関数は暗黙の引数としての this を持たず、 this を参照すると関数の外のスコープの this の値がそのまま使われるため
  //     doIt から greet5() を見た時 this は存在しないんじゃないってこと
  greet5 = () => {
    const doIt = () => {
      console.log(`Hi, I'm ${this.name}`);
    };
    doIt();
  }
}

const creamy = new Person3('Mami');
creamy.greet1();
creamy.greet2();
creamy.greet3();
creamy.greet4();
creamy.greet5();
