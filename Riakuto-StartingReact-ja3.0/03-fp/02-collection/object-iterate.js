/*
    オブジェクトの反復処理
      - 標準ビルドインオブジェクト Object(狭義のオブジェクト) を直接継承するオブジェクトの反復処理
      - for...in 文が使えるけど Airbnb のスタイルガイドでは Object自身が持つメソッドを使って
        一旦配列を形成する方法が推奨されている
      - プロトタイプメソッドにこれらのメソッド(keys, values, entries)がいないのか？
        - Objectはすべてのオブジェクト型の継承元になっているので、そのプロトタイプメソッドを追加するのは影響が大きすぎる
        - Date, RegEx といった他のビルドインオブジェクトすべてに対応するのは大変
        - 膨大なライブラリ群のオブジェクトすべてに keys() や values メソッドが追加されてしまうと脆弱性になっちゃいそう
 */
const user = {
  id: 3,
  name: 'Bobby Kumanov',
  username: 'bobby',
  email: 'bobby@maple.town',
};

// プロパティのキーのリスト
/*
  [ 'id', 'name', 'username', 'email' ]
 */
console.log(Object.keys(user));

// プロパティ値のリストを配列で取得
/*
  [ 3, 'Bobby Kumanov', 'bobby', 'bobby@maple.town' ]
 */
console.log(Object.values(user));

// キーと値が対になった２次元配列を返す
/*
  [
    [ 'id', 3 ],
    [ 'name', 'Bobby Kumanov' ],
    [ 'username', 'bobby' ],
    [ 'email', 'bobby@maple.town' ]
  ]
 */
console.log(Object.entries(user));
