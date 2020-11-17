/*
    閉じ込められたクロージャの秘密
      - クロージャ(関数閉包)とは 関数を関数で閉じて包むってこと
      - クロージャとは、関数と「その関数が作られた環境」という２つのものが一体となった特殊なオブジェクトを指す
      - クロージャというのは必ずしも内側の関数を返す必要はない
        単に外のスコープの自由変数を参照する関数をさらに関数で包み込んだものをクロージャという

    クラスにはできなくてクロージャにしかできないこと
      - 高階関数で外の関数の引数を内側の関数で参照できる
      - 関数の部分適用でその引数を固定したりできる
 */

// ＜閉じられていない状態＞
//   - グローバル変数 count に依存している（任意に書き換えができてしまう）
//   - increment は参照透過的ではなく挙動が予測不可能な関数だといえる
{
  let count = 0;

  const increment = () => {
    return count += 1;
  };

  console.log(increment()); // 1
  console.log(increment()); // 2
  console.log(count);       // 2
}

// ＜閉じられた状態にする - 1＞
//   - カウンター機能が関数の中に閉じ込められて結局使えない
{
  const counter = () => {
    let count = 0;
    const increment = () => {
      return count += 1;
    };
  };
}

// ＜閉じられた状態にする - 2＞
//   - 1 の状態から機能を外から使えるようにする
{
  const counter = () => {
    let count = 0;

    const increment = () => {
      return count += 1;
    };

    return increment;
  };

  const increment = counter();
  console.log(increment()); // 1
  console.log(increment()); // 2
  console.log(count);       // Uncaught ReferenceError: count is not defined
}

// ＜閉じられた状態にする - 3＞
//   - 2 の状態を更に使いやすくする
//   - 閉じ込められている外側の関数 counter は「エンクロージャ（Enclosure）」とも呼ばれる
{
  // count のような内側の関数 increment() の引数でもなく increment() 自身のローカル変数でもない
  // 変数のことを「自由変数（Free Variable）」
  const counter = (count = 0) => (adds = 1) => count += adds;
  const increment = counter();

  console.log(increment())  // 1
  console.log(increment(2)) // 3
}

/*
    なぜ上記サンプルの count 変数がクリアされずに増えていくのか？
      - 言語の種類に関わらず一般的なメモリのライフサイクル
        - 1. 必要なメモリを割り当てる
        - 2. 割り当てられたメモリを使用する
        - 3. 必要がなくなったら、割り当てたメモリを解放する
      - GCがメモリを解放しない条件
        - カレントスコープにいるものは問答無用で解放しない
        - スコープが外れているものに関してはメモリをつかんでいるものが参照しているかどうか
 */

// 変数 he は if 文のブロックを外れたら誰からも参照されなくなる（CGによってメモリを解放されてしまう）
{
  let frinedship = null;

  if (true) {
    const he = 'Kakeru';
    const saveHim = () => {
      console.log(`${he} saved`);
    };
  }
}

// 外からの参照を残す（GCによってメモリが解放されない）
/*
    JavaScriptでは関数のスコープは「レキシカルスコープ（Lexical Scope）」といってその定義時に決定され固定される
    自由変数を参照する内側の関数がエンクロージャによって返され外のスコープで生きている限り、その自由変数もGCに
    回収されずに保っていられるというわけ
 */
{
  let frinedship = null;

  if (true) {
    const he = 'Kakeru';
    const saveHim = () => {
      console.log(`${he} saved`);
    };
    frinedship = saveHim;
  }

  frinedship(); // kakeru saved
}
