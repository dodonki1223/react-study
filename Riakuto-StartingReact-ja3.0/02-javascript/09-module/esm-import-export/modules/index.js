/*
    ＜モジュールの集約＞
      - インポート元が複数ファイル、複数ディレクトリ階層に渡る場合、インポート文をいちいち分けて書くのが
        面倒なのでエクスポートをひとつのファイルに集約できる
      - 下記の例は contents.js と main.js でエクスポートしているものを index.js にまとめて再エクスポートしてる
      - export { default as ... } でデフォルトエクスポートされているものを再度名前をつけて直してエクスポートしている
      - contents2.js の中身をまとめて German という名前空間に押し込めた形で再エクスポートしているのが export * as ... という構文
          contents2.js の中身は以下のような感じ
            const EINS = 1;
            const ZWEI = 2;
            const DREI = 3;
            const VIER = 4;
            const FUNF = 5;

            export { EINS, ZWEI, DREI, VIER, FUNF };
 */
export * from './constants.js';
export { plus as add, default as multiply } from './math.js';
export * as German from './constants2.js';
