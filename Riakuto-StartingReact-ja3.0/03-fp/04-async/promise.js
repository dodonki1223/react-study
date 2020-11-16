/*
    Promise - JavaScriptで非同期処理を扱う基本
 */

// 下記、Promiseの実行結果
//   1. Success
//   2. Succees again
//   4. Completed
/*
    最初のコンストラクタで定義したコールバック関数 resolve() に渡したものが、then()の引数の関数で value として受け取れる
    then() 内で最後に return した値が次の then() での value になる
 */
{
  const isSucceeded = true;

  // Promise のコンストラクタに渡しているのが「関数を引数に取って内部でその関数を実行する関数」
  const promise = new Promise((resolve, reject) => {
    if (isSucceeded) {
      resolve('Success');
    } else {
      reject(new Error('Failure'));
    }
  });

  promise.then((value) => {
      console.log('1.', value);

      return 'Succees again';
    })
    .then((value) => {
      console.log('2.', value);
    })
    .catch((error) => {
      console.error('3.', error);
    })
    .finally(() => {
      console.log('4.', 'Completed');
    });
}

// isSucceededをfalse に書き換える
// 下記、Promiseの実行結果
//   3. Error: Failure
//      at repl:8:14
//      at new Promise (<anonymous>)
//      at repl:4:19
//      at Script.runInThisContext (vm.js:131:20)
//      at REPLServer.defaultEval (repl.js:436:29)
//      at bound (domain.js:429:14)
//      at REPLServer.runBound [as eval] (domain.js:442:12)
//      at REPLServer.onLine (repl.js:763:10)
//      at REPLServer.emit (events.js:327:22)
//      at REPLServer.EventEmitter.emit (domain.js:485:12)
//  4. Completed
/*
    reject() に渡したものが catch() で error として受け取れてエラーの内容がダンプされる
    そして結果が成功でも失敗でも、finally() に渡された関数は必ず最後に実行される
 */
{
  const isSucceeded = false;

  const promise = new Promise((resolve, reject) => {
    if (isSucceeded) {
      resolve('Success');
    } else {
      reject(new Error('Failure'));
    }
  });

  promise.then((value) => {
      console.log('1.', value);

      return 'Succees again';
    })
    .then((value) => {
      console.log('2.', value);
    })
    .catch((error) => {
      console.error('3.', error);
    })
    .finally(() => {
      console.log('4.', 'Completed');
    });
}
