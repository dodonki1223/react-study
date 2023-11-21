/*
2. state キューの独自実装

このチャレンジ問題では、React のごく一部をゼロから再実装します！ それほど難しくありません。

サンドボックスプレビューをスクロールしてください。4 つのテストケースが表示されていることに注意してください。
それらはこのページの先ほどの例に対応しています。あなたの仕事は、getFinalState 関数を実装して、それぞれのケースに対して正しい結果を返すことです。
正しく実装すると、すべてのテストが通るはずです。

2 つの引数を受け取ることになります。baseState は初期 state（例えば 0）であり、queue は数値（例えば 5）または更新用関数（例えば n => n + 1）のいずれかが、
キューに入れられた順番で入っている配列です。

あなたの仕事は、このページ内の表で見たような処理を行って、最終的な state を返すことです！

----- processQueue.js -----
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  // TODO: do something with the queue...

  return finalState;
}

----- App.js -----
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <>
      <p>Base state: <b>{baseState}</b></p>
      <p>Queue: <b>[{queue.join(', ')}]</b></p>
      <p>Expected result: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        Your result: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'correct' :
          'wrong'
        })
      </p>
    </>
  );
}
*/

/* processQueue.js */
// 以下が、このページで説明してきたような形で React が最終 state を計算するために使用しているアルゴリズムそのものです：
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  // TODO: do something with the queue...
  queue.forEach((v) => {
    if (v && typeof v === 'function') {
      finalState = v(finalState)
    } else {
      finalState = v;  
    }
  })

  return finalState;
}

/*
模範解答の結果
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // Apply the updater function.
      finalState = update(finalState);
    } else {
      // Replace the next state.
      finalState = update;
    }
  }

  return finalState;
}

*/
