/*
  CommonJS形式 - require
    - 2009年、Node.jsが登場しサーバーサイド言語としてのJavaScriptの体裁を整えるために CommonJS という
      標準API仕様を定めるプロジェクトが立ち上がりモジュールシステムが盛り込まれた
    - JavaScriptで開発したパッケージを手軽に公開することができるようになった
      - npm が構築されパッケージがたくさん公開された
    - npm のパッケージをブラウザでも使用したくなり 2011年に出てきたのが Browserify！
      - Browserify はブラウザ上で使えるようにする用途が主だったが、モジュール間の依存解決をしつつファイルを
        １つにまとめる `モジュールバンドラ` として使われるようになる
    - 大規模になってきたフロントエンド開発による問題点
      - モジュールの読み込みが同期的なので順番にロードする待ち時間が目に見えて長くなる（ネットワークのオーバーヘッドが大きい）
      - require も exports も条件分岐だろうとループの中だろうとどこでも呼べてしまうため静的解析が困難で出力ファイルの最適化がなかなかできない
      - RequireJS というモジュールローダが登場するがあまり広まらなかった……
 */

const moon = require('./moon');
moon.transform(); // Moon prism power, make up!

const { transform, finish } = require('./venus');
transform();      // Venus power, make up!
finish();         // Crescent beam!




