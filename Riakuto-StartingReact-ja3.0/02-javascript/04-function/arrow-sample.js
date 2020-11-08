/*
    ＜アロー関数式について＞
 */

// function キーワードによる関数式
const plusOne = function (n) {
  return n + 1;
}

// アロー関数式
const addOne = (n) => {
  return n + 1;
};

// アロー関数式、さらに省略記法
const increment = n => n + 1;

console.log(plusOne(1));
console.log(addOne(1));
console.log(increment(1));

/*
    ＜無名関数について＞
      - name プロパティが 空 の関数のこと
      - メモリに残らず、変数に代入されなければ定義した端から消滅する
 */

/* 名前あり関数  */
function mercury() {}
console.log(mercury.name); // 宣言文で定義した関数の名前

const fun = function mars() {};
console.log(fun.name);     // 関数式で定義した関数の名前

/* 名前なし関数(無名関数) */
console.log((function () {}).name);
console.log((() => {}).name);

/* 無名関数を変数に代入する */
/* 
    関数式による関数の定義は無名関数を一旦生成した上でそれを変数に代入すること
    によってメモリ上に残している
 */
const venus = function() { console.log('I am Venus!'); } ;
venus();
console.log(venus.name);

const jupiter = () => { console.log('I am Jupiter!'); } ;
jupiter();
console.log(jupiter.name);
