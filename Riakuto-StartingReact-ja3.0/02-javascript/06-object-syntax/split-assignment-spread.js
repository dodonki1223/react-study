// オブジェクトの中身を動的に変更したい時に役立つ方法
// [keyName] でキー名を動的に設定することができる
const keyName = 'bar';
const baz = 65536;
const obj1 = { foo: 256, [keyName]: 4096, baz: baz };
console.log(obj1); // { foo: 256, bar: 4096, baz: 65536 }

// プロパティ名のショートハンド
//   baz の名前がプロパティのキー名、値がそのプロパティ値になる
const obj2 = { baz };
console.log(obj2); // { baz: 65536 }

/*
    ＜分割代入＞
 */

// Airbnb の JavaScriptスタイルガイドでも分割代入を使うことが推奨されている
// なので積極的に使うことが望ましい！！
const [n, m] = [1, 4];
console.log(n, m); // 1 4

const obj = { name: 'Kanae', age: 24 };
const { name, age } = obj;
console.log(name, age); // Kanae 24


const response = {
  data: [
    {
      id: 1,
      name: 'Patty Rabbit',
      email: 'patty@maple.town', 
    },
    {
      id: 2,
      name: 'Rolley Cocker',
      email: 'rolley@palm.town', 
    },
    {
      id: 3,
      name: 'Bobby Bear',
      email: 'bobby@maple.town', 
    },
  ], 
};
// data プロパティの値を分割代入でそのキー名のまま抽出して変数にしている
// data プロパティが無かったらデフォルト値として []（空配列） が入るようになっている
const { data: users = [] } = response;
console.log(users);
/* 
  以下のように出力される
    [
      { id: 1, name: 'Patty Rabbit', email: 'patty@maple.town' },
      { id: 2, name: 'Rolley Cocker', email: 'rolley@palm.town' },
      { id: 3, name: 'Bobby Bear', email: 'bobby@maple.town' }
    ]
  const { data } = { data: [{}, {}, {}] };
    ↓
  const { 'data': data } = { 'data': [{}, {}, {}] };
                  ^^^^               ^^^^^^^^^^^^
 */

/*
    ＜スプレッド構文＞
      - 配列やオブジェクトの名前の前に ... をつけることでその中身が展開される
      - 関数のレストパラメータ構文と本質的には同じ
 */

// スプレッド構文で配列の展開
const arr1 = ['A', 'B', 'C'];
const arr2 = [...arr1, 'D', 'E'];
console.log(arr2);                     // [ 'A', 'B', 'C', 'D', 'E' ]

// スプレッド構文でオブジェクトの展開
const obj3 = {a: 1, b: 2, c: 3, d: 4};
const obj4 = { ...obj3, d: 99, e: 5 };
console.log(obj4);                     // { a: 1, b: 2, c: 4, d: 99, e: 5}

// 高度なスプレッド構文による分割代入
const user = { 
  id: 1,
  name: 'Patty Rabbit', 
  email: 'patty@maple.town', 
  age: 8,
};

// オブジェクト から id 以外を抜き出すやり方
const { id, ...userWithoutId } = user;
console.log(userWithoutId); // { name: 'Patty Rabbit', email: 'patty@maple.town', age: 8 }
