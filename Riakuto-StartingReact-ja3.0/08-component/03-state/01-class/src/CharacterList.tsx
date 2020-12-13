/* eslint-disable react/prefer-stateless-function */
import React, { Component, ReactElement } from 'react';
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

class CharacterList extends Component<Props> {
  render(): ReactElement {
    /*
        props へのアクセスはメンバー変数 props から行うようになっている
        関数コンポーネントの場合はその関数の引数として受け渡されたわけだけど、クラスの場合は
        this.props に格納されているのでそれを抽出する
     */
    const { school, characters } = this.props;

    return (
      <>
        <Header as="h2">{school}</Header>
        <Item.Group>
          {characters.map((character) => (
            <Item key={character.id}>
              <Icon name="user circle" size="huge" />
              <Item.Content>
                <Item.Header>{character.name}</Item.Header>
                <Item.Meta>{character.grade}年生</Item.Meta>
                <Item.Meta>
                  {character.height ?? '???'}
                  cm
                </Item.Meta>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </>
    );
  }
}

export default CharacterList;
