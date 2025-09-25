import { useState } from 'react'

function Square() {
  const [value, setvalue] = useState('');

  function handleClick() {
    setvalue('x');
  }
  
  return <button className="square" onClick={handleClick}>
    {value}
  </button>;
}

export default function Board() {
  return (
    <div className="board">
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  )
}
