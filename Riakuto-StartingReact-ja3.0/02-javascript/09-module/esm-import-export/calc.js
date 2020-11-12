// デフォルトエクスポートされた関数 times を同じ名前でインポートし
// 名前付きエクスポートされた関数 puls を同じ行でインポートしている
import times, { plus } from './modules/math.js';

// npmパッケージが格納されている node_modules ディレクトリにはパスが通っているのでパスの指定は必要ない
// _ って名前でインポートせず、 import { min, max } from 'lodash' のように必要なものだけインポートしてないのか？
//   - webpack の環境なら webpack がうまいことやってくれるからそれができる
//   - Lodash のパッケージは CommonJS 形式だから ES Modules でインポートする場合はすべてまとめた形でデフォルトエクスポート
//     されたものとみなされるため。これはあくまでも苦肉の策である
import _ from 'lodash';

console.log(plus(5));  // 6
console.log(times(4)); // 8

const arr = [7, 37, 48, 10, 5, 23];
console.log(_.min(arr), _.max(arr)); // 5 48
