/*
3. 選択項目が消える問題を修正

手紙のリストである letters が state に保持されています。手紙のどれかにホバーまたはフォーカスすると、その手紙がハイライトされるようになっています。現在ハイライト中の手紙は、highlightedLetter という state 変数に格納されています。
個々の手紙に対して “Star” や “Unstar”（スター解除）ができ、それにより state である letters 配列が更新されます。

機能はしていますが、このコードには小さな UI の不具合があります。
“Star” や “Unstar” を押すと、一瞬だけハイライトが消えてしまうのです。
ただしポインタを動かすか、キーボードで別の手紙に切り替えるとすぐにハイライトは再表示されます。
なぜこれが起こるのでしょうか？ ボタンクリック後にハイライトが消えないように修正してください。

----- App.js -----
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetter, setHighlightedLetter] = useState(null);

  function handleHover(letter) {
    setHighlightedLetter(letter);
  }

  function handleStar(starred) {
    setLetters(letters.map(letter => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter === highlightedLetter
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}

----- Letter.js -----
export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter);        
      }}
      onPointerMove={() => {
        onHover(letter);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}

----- data.js -----
export const initialLetters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
*/

// letterIDを使ってハイライトされているかどうかを求めた

import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetter, setHighlightedLetter] = useState(null);

  function handleHover(letter) {
    setHighlightedLetter(letter);
  }

  function handleStar(starred) {
    setLetters(letters.map(letter => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedLetter?.id
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}

/*
模範解答

問題は、highlightedLetter に手紙オブジェクトを保持していることです。
しかし同じ情報を letters 配列にも保持しています。つまり state に重複があるのです！ 
ボタンクリックに応じて letters 配列を更新する際に、highlightedLetter とは異なる新しい手紙データオブジェクトが作成されます。
これが、highlightedLetter === letter チェックが false になってハイライトが消えてしまう理由です。
次にポインタが移動して setHighlightedLetter が呼び出されるとハイライトは再表示されます。

この問題を解決するには、state から重複を削除します。2 つの場所でその手紙データ自体を格納する代わりに、
highlightedId を格納するようにします。これにより、letter.id === highlightedId とすることで、前回のレンダーから letter オブジェクトが変更された場合でも、
各手紙の isHighlighted をチェックできます。

----- App.js -----
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId ] = useState(null);

  function handleHover(letterId) {
    setHighlightedId(letterId);
  }

  function handleStar(starredId) {
    setLetters(letters.map(letter => {
      if (letter.id === starredId) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedId
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}

----- Letter.js -----
export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter.id);        
      }}
      onPointerMove={() => {
        onHover(letter.id);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter.id);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}

 */

/* App.js */
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState([]);
  const selectedCount = selectedIds.length;

  function handleToggle(toggledId, isSelected) {
    const exludedToggleIds = selectedIds.filter((id) => id !== toggledId)

    if (isSelected) {
      setSelectedIds([...exludedToggleIds])
    } else {
      setSelectedIds([...exludedToggleIds, toggledId]);      
    }
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
/* Letter.js */
export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id, isSelected);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}

/*
模範解答

自分のものとの違いは isSelected を受け取らずに selectedIds をもとに計算をしていること。
selectedIdsで計算は可能なので isSelected たしかにいらない

1 つの selectedId の代わりに、state で selectedIds という配列を保持するようにします。
例えば、最初と最後の手紙を選択したときに [0, 2] となるようにします。何も選択されていない場合は、空の [] という配列になります。

----- App.js -----
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedCount = selectedIds.length;

  function handleToggle(toggledId) {
    // Was it previously selected?
    if (selectedIds.includes(toggledId)) {
      // Then remove this ID from the array.
      setSelectedIds(selectedIds.filter(id =>
        id !== toggledId
      ));
    } else {
      // Otherwise, add this ID to the array.
      setSelectedIds([
        ...selectedIds,
        toggledId
      ]);
    }
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}

配列を使うことの小さな欠点の 1 つは、項目ごとに selectedIds.includes(letter.id) を呼び出して選択中かどうかを確認していることです。
配列が非常に大きい場合 includes() での配列検索にはリニアに時間がかかり、またこの検索は個々の項目ごとに行われているため、パフォーマンスの問題になることがあります。

これを解決するためには、代わりに state で Set を保持するようにできます。Set には高速な has() 操作があります。

----- App.js -----
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState(
    new Set()
  );

  const selectedCount = selectedIds.size;

  function handleToggle(toggledId) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.has(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
*/
