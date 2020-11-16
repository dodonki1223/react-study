/*
    Promise をハンドリングする
 */

// Node Fetch はモダンブラウザに実装されているネットワークリクエスト操作のための Fetch API をほぼ同じインターフェース
// で Node.js から使えるようにしたライブラリ。
import fetch from 'node-fetch';

const getUser = (userId) =>
  // この fetch() 関数もその戻り値である Response オブジェクトのメソッド json() も Promise オブジェクトを返してくるため
  // then() で受け止めてあげる
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`${response.status} Error`);
      } else {
        return response.json();
      }
    },
  );

console.log('-- Start --');

getUser(2)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log('-- Completed --');
  });
