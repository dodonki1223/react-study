/*
1. リクエストカウンタの修正 
あなたは、ユーザが美術品に対して複数の注文処理を同時並行で行える、アートマーケットアプリの開発をしています。
ユーザが “Buy” ボタンを押すたびに、“Pending”（処理中）カウンタが 1 つずつ増えるようにする必要があります。
3 秒後に “Pending” カウンタが 1 減り、“Completed” カウンタが 1 増える必要があります。

しかし、“Pending” カウンタは意図した通りに動作していません。
“Buy” を押すと、“Pending” が -1 に減少します（あり得ない！）。また、2 回素早くクリックすると、両方のカウンタが予測不可能な挙動を示します。

なぜこれが起こるのでしょうか？ 両方のカウンタを修正してください。

import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
*/

/*
handleClick イベントハンドラ内では、pending と completed の値はクリックイベントが起きた時点での値に対応しています。
最初のレンダーでは、pending は 0 だったため、setPending(pending - 1) は setPending(-1) となり、これは間違いです。
カウンタをインクリメントまたはデクリメントしたいので、クリック時に決まる具体的な値をセットするのではなく、代わりに更新用関数を渡すことができます。
*/
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending => pending + 1);
    await delay(3000);
    setPending(pending => pending - 1);
    setCompleted(completed => completed + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
