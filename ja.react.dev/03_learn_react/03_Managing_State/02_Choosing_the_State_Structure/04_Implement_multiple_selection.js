/*
4. 複数選択を実装
　
この例では、各 Letter（手紙）に props として、それが選択中かという情報である isSelected と
onToggle ハンドラが渡されています。機能していますが、state が selectedId（null または ID のどちらか）という
形で格納されているため、一度に 1 つの手紙しか選択できません。

state 構造を変更し、複数選択に対応させてください。（どのように構造化しますか？ コードを書く前に
考えてみてください。）各チェックボックスは他のチェックボックスとは独立して動作するようにしてください。
選択中の手紙をクリックすると、チェックが外れるようにしてください。
最後に、フッタに選択された項目数が正しく表示されるようにしてください。

----- App.js -----
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedId, setSelectedId] = useState(null);

  // TODO: allow multiple selection
  const selectedCount = 1;

  function handleToggle(toggledId) {
    // TODO: allow multiple selection
    setSelectedId(toggledId);
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
              // TODO: allow multiple selection
              letter.id === selectedId
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

----- Letter.js -----
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
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}

----- data.js -----
export const letters = [{
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

import { useState } from "react";
import { letters } from "./data.js";
import Letter from "./Letter.js";

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState([]);

  // TODO: allow multiple selection
  const selectedCount = 1;

  function handleToggle(toggledId) {
    if (selectedIds.includes(toggledId)) {
      const updateSelectedIds = [...selectedIds].filter(
        (selectedId) => selectedId !== toggledId
      );
      setSelectedIds(updateSelectedIds);
    } else {
      setSelectedIds([...selectedIds, toggledId]);
    }
    selectedIds.includes(toggledId)
      ? [...selectedIds]
      : [...selectedIds, toggledId];
    // TODO: allow multiple selection
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: allow multiple selection
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>You selected {selectedIds.length} letters</b>
        </p>
      </ul>
    </>
  );
}

/*
模範解答

1 つの selectedId の代わりに、state で selectedIds という配列を保持するようにします。
例えば、最初と最後の手紙を選択したときに [0, 2] となるようにします。
何も選択されていない場合は、空の [] という配列になります。

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
*/
