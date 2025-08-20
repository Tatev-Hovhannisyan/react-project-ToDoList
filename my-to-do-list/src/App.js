import './App.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: false },
    { text: 'Task 3', completed: false }
  ]);
  const [editingIndex, setEditingIndex] = useState(null); // индекс редактируемого элемента
  const [editingText, setEditingText] = useState('');

  const handleOnChange = (e) => {
    setText(e.target.value);
  }

  const handleOnClick = () => {
    if (text.trim() === "") return;
    setList([...list, { text, completed: false }]);
    setText("");
  }

  const handleRemoveLi = (index) => {
    let newList = list.filter((el, i) => i !== index);
    setList(newList);
  }

  const handleOnListClick = (index) => {
    const newList = list.map((el, idx) => {
      if (idx === index) {
        return { ...el, completed: !el.completed }
      }
      return el
    });
    setList(newList);
  }

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditingText(list[index].text);
  }

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  }

  const handleEditSubmit = (index) => {
    if (editingText.trim() === "") return; // не пустой текст
    const newList = list.map((el, idx) => {
      if (idx === index) return { ...el, text: editingText };
      return el;
    });
    setList(newList);
    setEditingIndex(null);
    setEditingText('');
  }

  return (
    <>
      <div className="container">
        <div className="input-wrapper"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <h1 className='h1'>To Do List</h1>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input className='input' value={text} onChange={handleOnChange} />
            <button className='add' onClick={handleOnClick} >Add</button>
          </div>

          <ul className='ul'>
            {list.map((lis, index) => (
              <li key={index}
                className='li'
                style={{ textDecoration: lis.completed ? "line-through" : "none" }}
                onClick={() => handleOnListClick(index)}
              >
                {editingIndex === index ? (
                  <input
                    className='editInput'
                    value={editingText}
                    autoFocus
                    onChange={handleEditChange}
                    onBlur={() => handleEditSubmit(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditSubmit(index);
                      if (e.key === "Escape") setEditingIndex(null);
                    }}
                  />
                ) : (
                  <span onDoubleClick={() => handleEditStart(index)}>
                    {lis.text}
                    <button className='btnRemove' onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveLi(index)
                    }}>X</button>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App;
