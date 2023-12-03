/*
2. プロフィールエディタ

以下は、プレーンな JavaScript と DOM で実装した小さなフォームです。このフォームをいじってみて、その動作を理解してください。

----- index.js -----
function handleFormSubmit(e) {
  e.preventDefault();
  if (editButton.textContent === 'Edit Profile') {
    editButton.textContent = 'Save Profile';
    hide(firstNameText);
    hide(lastNameText);
    show(firstNameInput);
    show(lastNameInput);
  } else {
    editButton.textContent = 'Edit Profile';
    hide(firstNameInput);
    hide(lastNameInput);
    show(firstNameText);
    show(lastNameText);
  }
}

function handleFirstNameChange() {
  firstNameText.textContent = firstNameInput.value;
  helloText.textContent = (
    'Hello ' +
    firstNameInput.value + ' ' +
    lastNameInput.value + '!'
  );
}

function handleLastNameChange() {
  lastNameText.textContent = lastNameInput.value;
  helloText.textContent = (
    'Hello ' +
    firstNameInput.value + ' ' +
    lastNameInput.value + '!'
  );
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;

----- index.html -----
<form id="form">
  <label>
    First name:
    <b id="firstNameText">Jane</b>
    <input
      id="firstNameInput"
      value="Jane"
      style="display: none">
  </label>
  <label>
    Last name:
    <b id="lastNameText">Jacobs</b>
    <input
      id="lastNameInput"
      value="Jacobs"
      style="display: none">
  </label>
  <button type="submit" id="editButton">Edit Profile</button>
  <p><i id="helloText">Hello, Jane Jacobs!</i></p>
</form>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
label { display: block; margin-bottom: 20px; }
</style>

このフォームは、編集モードでは入力フィールド、閲覧モードでは入力結果のみが表示される、
というように 2 つのモードを切り替えて動作します。ボタンのラベルは、モードによって “Edit” と “Save” が切り替わります。
入力内容を変更すると、下部のウェルカムメッセージがリアルタイムで更新されます。

あなたのタスクは、これを以下のサンドボックス内で React で再実装することです。
作業しやすいようにマークアップはすでに JSX に変換されていますが、元のコードと同様に入力フィールドの表示と非表示を行う必要があります。

また、下部のテキストもちゃんと更新されるようにしてください！

export default function EditProfile() {
  return (
    <form>
      <label>
        First name:{' '}
        <b>Jane</b>
        <input />
      </label>
      <label>
        Last name:{' '}
        <b>Jacobs</b>
        <input />
      </label>
      <button type="submit">
        Edit Profile
      </button>
      <p><i>Hello, Jane Jacobs!</i></p>
    </form>
  );
}
*/

import { useState } from "react";

export default function EditProfile() {
  // ここの変数名は isEditing が妥当やったかも。しっかりと命名を考えるべき
  const [editing, setEditing] = useState(false);
  // ここは firstName と lastName を分けていたがまぁ一緒に管理で良いと思う
  const [names, setNames] = useState({firstName: 'Jane', lastName: 'Jacobs'});

  const fullName = names.firstName + ' ' + names.lastName;

  function handleFirstNameChange(e) {
    setNames({
      ...names,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setNames({
      ...names,
      lastName: e.target.value,
    });
  }

  function handleEditProfile(e){
    // ここの処理 form 側の onSubmit でやるべきやった
    e.preventDefault();
    setEditing(!editing);
  }
  
  return (
    <form>
      <label>
        Last name:  {editing ? <input value={names.firstName} onChange={handleFirstNameChange} /> : <b>{names.firstName}</b>} 
      </label>
      <label>
        Last name:  {editing ? <input value={names.lastName} onChange={handleLastNameChange} /> : <b>{names.lastName}</b>} 
      </label>
      {/* 
          ボタンの submit 自体はそのままだった。 onclick はいじらない
          その代わり form 側の onSubmit 側を修正する必要があった
       */}
      <button onClick={handleEditProfile}>
        { editing ? 'Save' : 'Edit'} Profile
      </button>
      <p><i>Hello, {fullName}!</i></p>
    </form>
  );
}

/* 
模範解答

入力値を保持するために firstName と lastName の 2 つの state 変数が必要になります。
また、入力フィールドを表示するかどうかを管理する isEditing state 変数も必要になります。
fullName 変数は必要ありません。なぜなら、フルネームは常に firstName と lastName から計算できるからです。

最後に、条件付きレンダーを使用して、isEditing に応じて入力フィールドを表示したり非表示にしたりする必要があります。

import { useState } from 'react';

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Jacobs');

  return (
    <form onSubmit={e => {
      e.preventDefault();
      setIsEditing(!isEditing);
    }}>
      <label>
        First name:{' '}
        {isEditing ? (
          <input
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value)
            }}
          />
        ) : (
          <b>{firstName}</b>
        )}
      </label>
      <label>
        Last name:{' '}
        {isEditing ? (
          <input
            value={lastName}
            onChange={e => {
              setLastName(e.target.value)
            }}
          />
        ) : (
          <b>{lastName}</b>
        )}
      </label>
      <button type="submit">
        {isEditing ? 'Save' : 'Edit'} Profile
      </button>
      <p><i>Hello, {firstName} {lastName}!</i></p>
    </form>
  );
}
*/
