import logo from './logo.svg';
import './App.css';
import { useLayoutEffect, useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([{text:'Task 1', completed:false}, 
    {text:'Task 2', completed:false}, {text:'Task 3', completed:false}]);


const handleOnChange = (e)=>{
setText(e.target.value)
}

const handleOnClick = () =>{
   if(text.trim()==="") return;

setList([...list, {text, completed:false}])
setText("")
}

const handleRemuveLi = (index)=>{
 
  let newList = list.filter((el, i) => i !== index )
  setList(newList)
}
const handleOnListClick = (index) =>{
const newList = list.map((el, idx) =>{
 if(idx === index){
  return {...el, completed: !el.completed}
 }
 return el
})
setList(newList)
}

  return (
    <>
    <div className="container">
    
       <div className="input-wrapper" 
       style={{ display: 'flex',
         flexDirection: 'column', 
         alignItems: 'center', gap: '10px' }}>
  <h1 className='h1'>To Do List</h1>
        <div style={{display: 'flex', gap: '5px'}}>
      <input className='input' value={text} onChange={handleOnChange}/>
      <button className='add'  onClick={handleOnClick} >Add</button>
      </div>
   <ul className='ul'>
      

   {list.map((lis, index) =>(
    <li key= {index} 
     className='li' 
     onClick={()=>handleOnListClick(index)}
     style={{textDecoration:lis.completed ? "line-through": "none"}}>
      <span>{lis.text}
    <button  className='btnRemove'  onClick={(e)=>{
      e.stopPropagation();
      handleRemuveLi(index)}}>X</button></span> </li>
   ))}
  </ul>
    </div>
   
  </div>
    </>
  )
   
 
}

export default App;
