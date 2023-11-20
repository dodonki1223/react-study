/*
1. 信号機を実装

以下は、ボタンが押されると切り替わる歩行者用信号機のコンポーネントです。

import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}

クリックハンドラに alert を追加してください。信号が緑で “Walk” と表示されている場合、ボタンをクリックすると
 “Stop is next” と表示され、信号が赤で “Stop” と表示されている場合、ボタンをクリックすると “Walk is next” と表示されるようにしてください。

alert を setWalk の前に置いた場合と後に置いた場合で、違いはありますか？
*/

/*
alert を setWalk の前に置いた場合と後に置いた場合で、違いはありません。
このレンダー中、walk の値は固定です。setWalk を呼び出しても、次のレンダーまで実際の変更は起きず、現在レンダーのイベントハンドラには影響しません。
*/
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? 'Stop is next' : 'Walk is next');
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
