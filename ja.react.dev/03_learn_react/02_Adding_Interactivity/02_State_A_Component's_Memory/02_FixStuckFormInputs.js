// 2. 動かないフォームの修正
// 以下の入力フィールドに入力しても、何も表示されません。
// 入力値が空文字列に「固定」されているかのようです。最初の <input> の value は firstName 変数に常に一致するように設定されており、
// 2 番目の <input> の value は、lastName 変数に常に一致するように設定されています。
// それ自体は正しいです。両方の入力欄には onChange イベントハンドラがあり、最新のユーザ入力（e.target.value）に基づいて変数を更新しようとしています。
// ただし、再レンダー間で変数が値を「覚えて」いないようです。代わりに state 変数を使用することで、これを修正してください。

// 修正前コード
/*
export default function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
*/


// 修正後コード
// firstName, lastName それぞれに state を追加
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleReset() {
    setFirstName('');
    setLastName('');
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}
