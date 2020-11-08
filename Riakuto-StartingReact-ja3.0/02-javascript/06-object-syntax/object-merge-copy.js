/*
    ＜Object.assign() を使用した オブジェクトのコピー＞
      - オブジェクト型の値は別の変数に代入しただけだと参照渡しになって実態は共有されたままになってしまう
        オブジェクトのコピーはちゃんと考える必要がある
      - Object.assign() 第１引数のオブジェクトに、第２引数以降のオブジェクトの各プロパティを追加・上書きしていくメソッド
      - シャローコピー になるのでコピーの深さが１段階までしか有効じゃない
 */

// 空のオブジェクトに値を上書きすることでコピーされる
const original ={ a: 1, b: 2, c: 3 };

const copy = Object.assign({}, original);
console.log(copy);              // { a: 1, b: 2, c: 3 }
console.log(copy === original); // false → プロパティが同じでもアドレスを共有しない別オブジェクト

// Object.assign() は破壊的にメソッドである
//   実行後は assigned と original は同じに書き換えられる
const assigned = Object.assign(original, { c: 10, d: 50 }, { d: 100 });
console.log(assigned);              // { a: 1, b: 2, c: 10, d: 100 }
console.log(original);              // { a: 1, b: 2, c: 10, d: 100 }
console.log(assigned === original); // true

/*
    ＜スプレッド構文を使用した オブジェクトのコピー＞
      - シャローコピー になるのでコピーの深さが１段階までしか有効じゃない
 */

// Object.assign() を使わずに スプレッド構文を使ったやり方
const original2 ={ a: 1, b: 2, c: 3 };

const copy2 = { ...original2 }
console.log(copy2);               // { a: 1, b: 2, c: 3 }
console.log(copy2 === original2); // false → プロパティが同じでもアドレスを共有しない別オブジェクト

// original2 が汚染されなくなるのでこっちのほうが安全
const assigned2 = { ...original2, ...{ c: 10, d: 50 }, d: 100 }
console.log(assigned2);               // { a: 1, b: 2, c: 10, d: 100 }
console.log(original2);               // { a: 1, b: 2, c: 3 }

/*
    ＜ディープコピーをするには？＞
      - JSON.parse(JSON.stringify(patty2)) を使う（かなり強引なやり方）
        - いったん文字列として展開してからJSONにパースし直している
        - プロパティに Date オブジェクトや関数、undefined が入っていた場合はうまく動かない
      - Lodash の cloneDeep() を使うことが一般的
 */

const patty = {
  name: 'Patty Rabbit',
  email: 'patty@maple.town', 
  address: { town: 'Maple Town' },
};

// スプレッド構文ではちゃんとディープコピーできないOrz
const rolley = { ...patty, name: 'Rolley Cocker' };
rolley.email = 'rolley@palm.town';
rolley.address.town = 'Palm Town';

console.log(patty);
console.log(rolley);
/*
  以下のように出力され、patty の town が変更されてしまう・・・・・・
  シャローコピーなので２段階目は参照渡しになっている置き換わってしまう
  {
    name: 'Patty Rabbit',
    email: 'patty@maple.town',
    address: { town: 'Palm Town' }
  }
  {
    name: 'Rolley Cocker',
    email: 'rolley@palm.town',
    address: { town: 'Palm Town' }
  }
 */

// ディープコピーさせる裏技
const patty2 = {
  name: 'Patty Rabbit',
  email: 'patty@maple.town', 
  address: { town: 'Maple Town' },
};

// 文字列として展開してから JSON に パースし直している
const rolley2 = JSON.parse(JSON.stringify(patty2));
rolley2.name = 'Rolley Cocker';
rolley2.email = 'rolley@palm.town';
rolley2.address.town = 'Palm Town';

console.log(patty2);
console.log(rolley2);
/*
  以下のように出力され、ディープコピーができていることが確認できる
  {
    name: 'Patty Rabbit',
    email: 'patty@maple.town',
    address: { town: 'Maple Town' }
  }
  {
    name: 'Rolley Cocker',
    email: 'rolley@palm.town',
    address: { town: 'Palm Town' }
  }
 */
