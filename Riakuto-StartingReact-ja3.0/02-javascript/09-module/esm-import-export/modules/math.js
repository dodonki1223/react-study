// as 句を使用して TWO は変数名を ZWEI に変更してる
// モジュール間で名前がバッティングしてしまうときや長い名前を省略して取り回したい時に
// as キーワードを使うことで名前を変更できる
import { ONE, TWO as ZWEI } from './constants.js';

export const plus = (n, m = ONE) => n + m;
const times = (n, m = ZWEI) => n * m;

/*
    デフォルトエクスポート
      - export default の部分がデフォルトエクスポートという
      - 読み込む側で任意の名前を付けられる
      - １モジュール（= １ファイル）につき１回まで
 */
export default times;
