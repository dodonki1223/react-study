import React, { Component, ReactElement } from 'react';
import { Button, Card, Statistic } from 'semantic-ui-react';
import './App.css';

type State = {
  count: number;
};

/*
    - Component<unknown, State> と型引数が２つある
      - unknown の部分が props だが今回は必要ないので unknown で定義している
      - @typescript-eslint/ban-types のルールで仕様が禁じられている
      - プロパティを持てない unknown がここではふさわしい
    - ２つ目の引数が state の型になる
 */
class App extends Component<unknown, State> {
  constructor(props: unknown) {
    // この記述はお約束で必要である（親クラスのコンストラクタを props を使用して実行 ）
    super(props);
    // 直接値を代入していいのは constructor の中だけである
    this.state = { count: 0 };
  }

  reset(): void {
    this.setState({ count: 0 });
  }

  increment(): void {
    /*
        「this.setState({ count: state.count + 1 })」の書き方では駄目なの？
          - クラスの state の更新は React によるレンダリング最適化処理の中で非同期に行われる
          - increment() が参照する state の値はその瞬間での最新の値であることが厳密には保証されない
          - state の前の状態に依存するような変更処理は (state, props) => ({ foo: state.foo + props.bar }) の書き方を使用したほうがよい
     */
    this.setState((state) => ({ count: state.count + 1 }));
  }

  render(): ReactElement {
    const { count } = this.state;

    return (
      <div className="container">
        <header>
          <h1>カウンター</h1>
        </header>
        <Card>
          <Statistic className="number-board">
            <Statistic.Label>count</Statistic.Label>
            <Statistic.Value>{count}</Statistic.Value>
          </Statistic>
          <Card.Content>
            <div className="ui two buttons">
              <Button color="red" onClick={() => this.reset()}>
                Reset
              </Button>
              {/*  
                  - () => this.increment() ・・・ 引数を受けとらずに increment メソッドを実行する無名関数

                  - ユーザーのフォーム操作によって、親コンポーネントの中身を書き換える必要がある時はどうするのか？
                    - 親コンポーネントが自身の状態を変更する関数を子コンポーネントに渡してフォーム入力時発火される
                      イベントへその関数を仕込んでおく
                    - 「() => this.increment()」が親コンポーネント自体の値を更新している
                    - 「onClick={() => this.increment()}」が子コンポーネントに渡してフォーム入力時発火されるイベントへ関数を仕込んでいる
              */}
              <Button color="green" onClick={() => this.increment()}>
                +1
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default App;
