import React, { Component, ReactElement } from 'react';
import CharacterList, { Character } from './CharacterList';
import './App.css';

class App extends Component {
  /*
      クラスのメンバー変数で定義されている
      TypeScript のプロパティ初期化子で定義
   */
  characters: Character[] = [
    {
      id: 1,
      name: '桜木花道',
      grade: 1,
      height: 189.2,
    },
    {
      id: 2,
      name: '流川 楓',
      grade: 1,
      height: 187,
    },
    {
      id: 3,
      name: '宮城リョータ',
      grade: 2,
      height: 168,
    },
    {
      id: 4,
      name: '三井 寿',
      grade: 3,
    },
    {
      id: 5,
      name: '赤木剛憲',
      grade: 3,
      height: 197,
    },
  ];

  /*
      - 関数コンポーネントではその関数自体が返す返り値がレンダリング対象になっていた
      - クラスコンポーネントでは代わりにメンバーメソッド `render()` が戻り値になっている
   */
  render(): ReactElement {
    return (
      <div className="container">
        <header>
          <h1>SLAM DUNK 登場人物</h1>
        </header>
        <CharacterList school="湘北高校" characters={this.characters} />
      </div>
    );
  }
}

export default App;
