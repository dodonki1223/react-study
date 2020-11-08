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

