/*
    ＜ショートサーキット評価（短絡評価）＞
 */

// OR演算子 || は左辺が falsy な値だと評価が右辺に渡される
//   変数の初期化を動的に行い時に便利
//   何かを実行して帰ってきた値が失敗を示すものだったら変わりに別の値を入れたいときなど
const hello = undefined || null || 0 || NaN || '' || 'Hello!';

// AND演算子 && は左辺が truthy な値のときに評価が右辺に渡される
//   if 文の代わりに使用することができるので便利！
const chao='' && 100 && [] && {} && 'Chao!';

false && console.log('1.',hello);            // (no output)
true && console.log('2.',hello);             // 2.Hello!
false || console.log('3.',chao);             // 3.Chao!

/*
    ＜Nullish Coalescing と Optional Chaining＞
      - ??：Nullish Coalescing（ヌリッシュ・コアレッシング）
        - null や undefined のときだけ右辺が評価される
        - Nullish Coalescing が使える時は OR演算子 よりもこちらを採用すること
      -  ?：Optional Chaining
        - チェーン内の途中のプロパティが存在してなかったら undefined を返す
        - ２階層以上に渡って使用していた時、１階層目で undefined が返える場合、２階層目でプロパティを
          さらに参照しようとするとタイプエラーになるが ? 演算子を使うことによってエラーにならない
          Ruby の try と似た機能かな
 */

const users = [
  {
    name: 'Patty Rabbit', 
    address: {
      town: 'Maple Town', 
    },
  }, 
  {
    name: 'Rolley Cocker',
    address: {}, 
  },
  null, 
];

for (u of users) {

  // ?? 演算子は左辺が null または undefined のときだけ右辺が評価される
  //   Nullish Coalescing は癒着・合体するって意味
  //   0 や '' の空文字といった falsy な値はそのまま評価される
  const user = u ?? { name: '(Somebody)' };

  // ?. 演算子を使うとチェーン内の各参照が正しいかどうかを明示的に確認せずにアクセスできる
  // 途中のプロパティが存在していなかったら、そこで式が短絡されて undefined を返してくれる
  //   プロパティだけでなくメソッドも使用することができる（ foo?.bar()?.baz()みたいな ）
  //   ?. 演算子を使うとオブジェクトのプロパティに対するプロパティアクセス演算子は . と [] の２つ
  //   それが１階層目だったら undefined が返るだけなんだけど、その参照が２階層以上に渡って外れて
  //   いるとタイプエラーにならなくなる
  const town = user?.address?.town ?? '(Somewhere)';
  console.log(`${user.name} lives in ${town}`);
}
/*
  以下のような出力になります
    Patty Rabbit lives in Maple Town
    Rolley Cocker lives in (Somewhere)
    (Somebody) lives in (Somewhere)
 */
