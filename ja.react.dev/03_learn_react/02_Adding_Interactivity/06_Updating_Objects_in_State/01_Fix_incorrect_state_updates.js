/*
1. 間違った state 更新を修正

このフォームにはいくつかのバグがあります。スコアを増やすボタンを何度かクリックしてみてください。
スコアが増えないことに気付くと思います。次に、ファーストネーム欄に入力をしようとすると、
思い出したかのようにスコアが最新の値に更新されることを確認してください。
最後に、ラストネームを入力してみてください。今度はスコアが完全に消えてしまいます。

あなたの仕事はこれらのバグをすべて修正することです。修正しながら、それぞれのバグがなぜ発生するのかを説明してください。

import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
*/


/*
handlePlusClick の問題は、player オブジェクトを書き換えてしまっていたことです。
その結果、React は再レンダーの必要性を認識せず、画面上のスコアは更新されませんでした。
ですがファーストネームを編集すると、対応する state が更新されてレンダーがトリガされるので、その際に画面上のスコアも併せて最新の値になった、というわけです。

handleLastNameChange の問題は、新しいオブジェクトに既存の ...player フィールドをコピーしなかったことです。
これが、ラストネームを編集した後にスコアが消えてしまった理由です。
*/
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    const nextScore = player.score + 1;
    setPlayer({
      ...player,
      score: nextScore,
    });
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      ...player,
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}







