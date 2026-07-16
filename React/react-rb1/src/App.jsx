export default function App(){
  return(
    <div className="bg-gray-100">
      <h1 className="text-xl text-center m-4 p-3">Hallo MasPur</h1>

      <Button/>
      <ButtonRed/>
      <Greeting name="MasPur"/>
      <Card name="MasPur" age={25} email="maspur@example.com"/>
    </div>
  )
}

function Button(){
  return(
    <button className="bg-blue-500 text-white p-2 rounded m-2 hover:bg-blue-700">
      Click Me
    </button>
  )
}

const ButtonRed = () => {
  return(
    <button className="bg-red-500 text-white p-2 rounded m-2 hover:bg-red-700">
      Click Me
    </button>
  )
}

// Props

function Greeting({name}){
  return(
    <h1 className="text-xl text-center m-4 p-3">Hallo {name}</h1>
  )
}

function Card({name,age,email}){
  return(
    <div className="bg-white shadow-md rounded p-4 m-4 max-w-sm">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  )

  
}