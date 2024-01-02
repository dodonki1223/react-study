/*
1. 入力欄の同期

以下の 2 つの入力欄は独立しています。同期して動作するようにしましょう。
片方の入力欄を編集すると、他方の入力欄も同じテキストに更新されるようにしてください。

----- App.js -----

import { useState } from 'react';

export default function SyncedInputs() {
  return (
    <>
      <Input label="First input" />
      <Input label="Second input" />
    </>
  );
}

function Input({ label }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <label>
      {label}
      {' '}
      <input
        value={text}
        onChange={handleChange}
      />
    </label>
  );
}
*/

import { useState } from "react";

export default function SyncedInputs() {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Input label="First input" text={text} handleChange={handleChange} />
      <Input label="Second input" text={text} handleChange={handleChange} />
    </>
  );
}

function Input({ label, text, handleChange }) {
  return (
    <label>
      {label} <input value={text} onChange={handleChange} />
    </label>
  );
}

/*
模範解答

text という state 変数と handleChange ハンドラを親コンポーネントに移動させます。
次に、それらを両方の Input コンポーネントに props 経由で渡します。
これにより、2 つの入力欄の同期が保たれます。

import { useState } from 'react';

export default function SyncedInputs() {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Input
        label="First input"
        value={text}
        onChange={handleChange}
      />
      <Input
        label="Second input"
        value={text}
        onChange={handleChange}
      />
    </>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label>
      {label}
      {' '}
      <input
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

*/
