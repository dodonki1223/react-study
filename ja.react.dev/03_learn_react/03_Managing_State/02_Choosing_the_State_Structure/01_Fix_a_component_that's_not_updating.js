/*
1. 更新されないコンポーネントの修正

この Clock コンポーネントは、color と time の 2 つの props を受け取ります。セレクトボックスで別の色を選択すると、Clock コンポーネントは親コンポーネントから props として異なる color を受け取るようになっています。
しかし、何らかの理由で表示される色が更新されません。
なぜでしょうか？ 問題を修正してください。

import { useState } from 'react';

export default function Clock(props) {
  const [color, setColor] = useState(props.color);
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
  );
}
*/

/*
この問題は、このコンポーネントが color という state を color という props の初期値を使って初期化していることが原因です。
しかし、props としての color が変更されても state 変数の方は影響されません！ 
それらが同期されなくなってしまっているわけです。この問題を解決するには state 変数自体を削除し、props としての color を直接使用します。
*/

import { useState } from 'react';

export default function Clock(props) {
  const color = props.color;
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
  );
}
