/*
4. 不要な state を削除
この例では、ボタンがクリックされると、ユーザの名前を尋ねて、挨拶を表示するアラートが表示されるはずです。
名前を保持するために state を使用しようとしましたが、何らかの理由で常に “Hello, !” と表示されます。

このコードを修正するには、不要な state 変数を削除してください（この問題が発生した理由については後で説明します）。

この state 変数が不要であった理由を説明できますか？
*/

// 修正前コード
/*
import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');

  function handleClick() {
    setName(prompt('What is your name?'));
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
*/

// 修正後コード
// state 変数は、コンポーネントの再レンダー間で情報を保持するためにのみ必要なものです
export default function FeedbackForm() {
  function handleClick() {
    const name = prompt('What is your name?');
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}
