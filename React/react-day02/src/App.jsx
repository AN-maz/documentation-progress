import { useState } from "react";

function App() {

  const [tasks, setTasks] = useState(["Belajar React", "Push ke Github"]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  }

  return (

    <div>
      <h1>Project Frist React</h1>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis Tugas Baru..."
          style={{ padding: '8px' }} />

        <button onClick={handleAddTask} style={{marginLeft:'10px'}}>
          Tambah
        </button>

      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>

  )
}


export default App