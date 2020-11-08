/*
    ＜クラス構文をプロトタイプベースに書き換える＞
      下記のクラス構文をプロトタイプベースに書き換える
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
 */

function Bird(name) {
  this.name = name;
  this.chirp = function () {
    console.log(`${this.name}が鳴きました`);
  };

  return this;
}

Bird.explain = function (name) {
  console.log(`${name}は翼があって卵を生みます`);
};

function FlyableBird(name) {
  Bird.call(this, name);
  this.fly = function () {
    console.log(`${this.name}が飛びました`);
  };

  return this;
}

FlyableBird.prototype.__proto__ = Bird.prototype;

const penguin = new Bird('ペンギン');
penguin.chirp();
Bird.explain('カラス');

const hawk = new FlyableBird('タカ');
hawk.fly();
