import React, { FC } from 'react';
import { Header, Icon, Item } from 'semantic-ui-react';

export type Character = {
  id: number;
  name: string;
  grade: number;
  height?: number;
};

type Props = {
  school: string;
  characters: Character[];
};

/*
    - FCに型引数を渡すことで、そのコンポーネントの props の型を指定することができる
    - App.tsxで<CharacterList> をマウントする時、 school と character の属性値を記述しなかったり
      新たな属性値を追加すると怒られる
 */
const CharacterList: FC<Props> = (props) => {
  // 分割代入で取得している
  const { school, characters } = props;

  return (
    /*
        `<>...</>`：React.Fragmentのシンタックスシュガー
                    用途としてはdivでもいいがdivの階層ができてしまう
                    注意点としては処理の結果で中身がなくなってしまう場合は使ってはいけない（この時はdivを使うでいいのかな）
    */
    <>
      <Header as="h2">{school}</Header>
      <Item.Group>
        {characters.map((character) => (
          /*
              JSXで要素をループ処理によって記述する場合、各要素にユニークな値を key 属性として設定すること
              仮想DOMの差分検出処理で再レンダリングを効率的にするために必要
           */
          <Item key={character.id}>
            <Icon name="user circle" size="huge" />
            <Item.Content>
              <Item.Header>{character.name}</Item.Header>
              <Item.Meta>{character.grade}年生</Item.Meta>
              <Item.Meta>
                {/* character.heightが設定されていなかったら `undefined` が返ってくる */}
                {character.height ? character.height : '???'}
                cm
              </Item.Meta>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </>
  );
};

export default CharacterList;
