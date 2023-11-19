// 1. ギャラリの完成
// 最後の彫刻が表示されているときに “Next” を押すと、コードがクラッシュします。
// クラッシュを防ぐためにロジックを修正してください。そのためには、イベントハンドラに追加のロジックを追加するか、操作が不可能な場合はボタンを無効化しましょう。
// クラッシュを修正できたら、“Previous” ボタンを追加して、ひとつ前の彫刻を表示するようにしてください。最初の彫刻でクラッシュしないようにしましょう。

// 修正前コード
/*
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
*/


// Next button の disable の制御を追加
/*
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [nextButtonEnable, setNextButtonEnable] = useState(true);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    nextIndex = index + 1;
    setIndex(nextIndex);
    if (sculptureList.length - 1 <= nextIndex) {
      setNextButtonEnable(false);
      return;
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      {
        nextButtonEnable ?
        <button onClick={handleNextClick}>Next</button>
        :
        <button disabled onClick={handleNextClick}>Next</button>
      }
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
*/

// 最終的にできたコード
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [nextButtonEnable, setNextButtonEnable] = useState(true);
  const [previousButtonEnable, setPreviousButtonEnable] = useState(false);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    nextIndex = index + 1;
    setIndex(nextIndex);
    setPreviousButtonEnable(true);
    if (sculptureList.length - 1 <= nextIndex) {
      setNextButtonEnable(false);
      return;
    }
  }

  function handlePreviousClick() {
    previousIndex = index == 0 ? 0 : index - 1;
    setIndex(previousIndex);
    setNextButtonEnable(true);
    if (previousIndex == 0) {
      setPreviousButtonEnable(false);
      return;
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      {/* disabled の書き方に関しては disabled={!hasNext} がいけたは……。 */}
      {
        nextButtonEnable ?
        <button onClick={handleNextClick}>Next</button>
        :
        <button disabled onClick={handleNextClick}>Next</button>
      }
      {
        previousButtonEnable ?
        <button onClick={handlePreviousClick}>Previous</button>
        :
        <button disabled onClick={handlePreviousClick}>Previous</button>
      }
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}

// 実際の答えの例
/*
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        onClick={handleNextClick}
        disabled={!hasNext}
      >
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
*/
