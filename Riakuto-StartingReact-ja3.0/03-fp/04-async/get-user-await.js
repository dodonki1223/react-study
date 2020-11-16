/*
    Promise をハンドリングする
      - get-user-then.js を async/await で書き換える

    await を使えば、.then(() => {}).then(() => {}).then(() => {}) なんて面倒なことを書かなくても、
    複数の非同期処理を書いたまま順番に実行してくれる
 */
import fetch from 'node-fetch';

// 関数宣言時に async キーワードを付与するとその関数は「非同期関数」となって返される値が暗黙の内に
// Promise.resolve() によってラップされたものになる
const getUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!response.ok) {
    throw new Error(`${response.status} Error`);
  }

  return response.json();
};

console.log('-- Start --');

const main = async () => {
  try {
    // await 式によって非同期関数を実行すると、その Promise が resolve されるか 
    // reject されるまで文字通り待ってもらえるようになる
    const user = await getUser(2);
    console.log(user);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('-- Completed --');
  }
};

main();
