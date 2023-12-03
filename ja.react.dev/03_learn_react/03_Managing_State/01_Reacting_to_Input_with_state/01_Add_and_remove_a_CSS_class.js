/*
1. CSS クラスの追加・削除

画像をクリックすると、外側の <div> から  background--active CSS クラスが削除され、
<img> に picture--active クラスが追加されるようにしてください。もう一度背景をクリックすると、元の CSS クラスに戻るようにします。
視覚的には、画像の上をクリックすると、紫色の背景が消え、画像の境界線がハイライトされると考えてください。
画像の外側をクリックすると、背景がハイライトされますが、画像の境界線のハイライトは削除されます。

----- App.js -----

export default function Picture() {
  return (
    <div className="background background--active">
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}
*/

import { useState } from "react";

export default function Picture() {
  const [backgoundClicked, setBackgroundClicked] = useState(
    "background background--active"
  );
  const [pictureClicked, setPictureClicked] = useState("picture");

  function handleBackground() {
    setBackgroundClicked("background background--active");
    setPictureClicked("picture");
  }

  function handlePicture(e) {
    e.stopPropagation();
    setBackgroundClicked("background");
    setPictureClicked("picture picture--active");
  }

  return (
    <div className={backgoundClicked} onClick={handleBackground}>
      <img
        className={pictureClicked}
        onClick={handlePicture}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}

/*

模範解答

解いたものは出来ているが超絶美しくなった……。


このコンポーネントは、画像がアクティブなときと、画像が非アクティブなときの 2 つの視覚状態を持ちます。

画像がアクティブの場合、CSS クラスは background と picture picture--active となります。
画像が非アクティブの場合、CSS クラスは background background--active と picture になります。
画像がアクティブかどうかを記憶するためには、単一のブール型の state 変数があれば十分です。
本来の作業は CSS クラスを削除または追加することでした。しかし、React では UI 要素を操作するのではなく、
何を見たいのかを記述する必要があります。そのため、現在の state に基づいて両方の CSS クラスを計算する必要があります。
また、画像のクリックが背景のクリックとしても処理されてしまわないように、イベントの伝播を停止する必要があります。

画像をクリックしたりその外側をクリックしたりして、このバージョンが動作することを確認してください。

import { useState } from 'react';

export default function Picture() {
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = 'background';
  let pictureClassName = 'picture';
  if (isActive) {
    pictureClassName += ' picture--active';
  } else {
    backgroundClassName += ' background--active';
  }

  return (
    <div
      className={backgroundClassName}
      onClick={() => setIsActive(false)}
    >
      <img
        onClick={e => {
          e.stopPropagation();
          setIsActive(true);
        }}
        className={pictureClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}

あるいは、2 つの別々の JSX の塊を返すこともできます。

import { useState } from 'react';

export default function Picture() {
  const [isActive, setIsActive] = useState(false);
  if (isActive) {
    return (
      <div
        className="background"
        onClick={() => setIsActive(false)}
      >
        <img
          className="picture picture--active"
          alt="Rainbow houses in Kampung Pelangi, Indonesia"
          src="https://i.imgur.com/5qwVYb1.jpeg"
          onClick={e => e.stopPropagation()}
        />
      </div>
    );
  }
  return (
    <div className="background background--active">
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={() => setIsActive(true)}
      />
    </div>
  );
}

異なる 2 つの JSX の塊が同じツリーを記述する場合、
それらのネスト（最初の <div> → 最初の <img>）は一致する必要があることに留意してください。
そうでなければ、isActive を切り替えると、下のツリー全体が再作成され、state がリセットされてしまいます。
このため、同じような JSX ツリーが両方のケースで返される場合は、1 つの JSX として記述する方が良いでしょう。
 */
