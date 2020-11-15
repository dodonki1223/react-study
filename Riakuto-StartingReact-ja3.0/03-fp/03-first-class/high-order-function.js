/*
    高階関数
      - 引数に関数を取ったり、戻り値として関数を返したりする関数のこと
      - Reactでもコンポーネントを引数にとってコンポーネントを戻り値として返す高階コンポーネントという概念がある
 */

/*
    戻り値として関数を返す関数のサンプル
 */
const greeter = (target) => {
  const sayHello = () => {
    console.log(`Hi, ${target}!`);
  };

  // return sayHello() と記述してしまうとその場で関数を実行して
  // その結果の undefined を返してしまうので注意
  return sayHello;
};

const greet = greeter('Jun');
console.log(greet)            // [Function: sayHello]
greet();

/*
    戻り値として関数を返す関数のサンプル（不要な代入を避ける）
 */
const greeter2 = (target) => {
  return () => {
    console.log(`Hi, ${target}!`);
  }
};

const greet2 = greeter2('Jun');
console.log(greet2)            // [Function]
greet2();

/*
    戻り値として関数を返す関数のサンプル（不要な代入を避ける、更に省略）
 */
const greeter3 = (target) => () => console.log(`Hi, ${target}!`);

const greet3 = greeter3('Jun');
console.log(greet3)            // [Function]
greet3();
