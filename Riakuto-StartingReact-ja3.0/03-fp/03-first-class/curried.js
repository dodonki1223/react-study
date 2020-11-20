/*
    カリー化と関数の部分適用
      - カリー化とは 複数の引数を取る関数をより少ない引数を取る関数に分割して入れ子にすること
      - 複数の引数を取る関数を、引数が「元の関数の最初の引数」で戻り値が「引数として元の関数の残りの引数を取り、
        それを使って結果を返す関数」である高階関数にすることをカリー化と呼ぶ
 */

// 引数 n と m を取り、その積を返すだけの関数
{
  const multiply = (n, m) => n * m;
  console.log(multiply(2, 4));              // 8
}

// n を引数に取った上で『m を引数に取り n との積を返す関数』を返す関数
{
  const withMultiple = (n) => {
    return (m) => n * m;
  };
  console.log(withMultiple(2)(4));          // 8
}

/*
    関数の部分適用
      - カリー化された関数の一部の引数を固定して新しい関数を作ること 関数の部分適用 という
 */

// withMultiple(n) 自体が『m を引数に取って m * n を返す関数
{
  const withMultiple = (n) => (m) => n * m;
  console.log(withMultiple(2)(4));          // 8
  console.log(withMultiple(3)(5));          // 15

  // triple は元の関数に還元すれば multiple(3, m) になる
  // どんな値を渡しても、常に３倍される関数が作れる（関数の部分適用）
  const triple = withMultiple(3);
  console.log(triple(5));                   // 15
}
