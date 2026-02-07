import './assets/index.css'
import { useState } from 'react';

function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div className='counter'>
      <p>Nilai: {count}</p>

      <div className="button">
        <button onClick={() => setCount(count + 1)}>
          Tambihan
        </button>

        <button onClick={() => setCount(count - 1)}>
          Kirangan
        </button>
      </div>
    </div>
  );
}

function FormNama() {
  const [nama, setNama] = useState('');

  return (
    <div>
      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder='Masukkan nama Anda...' />

      <p>
        Nama Anda: {nama}
      </p>
    </div>
  );
}

const Welcome = () => {
  return <h1>Hello MasPur!</h1>
}

// PROPS

function Greeting(props) {
  return <h1>Hi! {props.name}</h1>
}

function DestrucGreeting({ name }) {
  return <h1>Hi! {name} </h1>
}

// Multiple Props
function UserCard({ name, age, email }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Umur:{age}</p>
      <p>Email:{email}</p>
    </div>
  );
}

// Props children
function Card({ children, title }) {
  return (
    <div className="card">
      <h1>{title}</h1>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// State Dengan Object 
function FormUser() {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  return (
    <form>
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder='Nama'
        type='text'
      />

      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder='Email'
        type='email'
      />

      <p>Nama: {user.name}</p>
      <p>Email: {user.email}</p>
    </form>
  );
}

function App() {

  return (
    <>
      <Welcome />
      <Greeting name="Greeting" />
      <DestrucGreeting name="DestrucGreeting" />
      <UserCard
        name="Purwa"
        age={25}
        email="purwa@gmail.com"
      />

      <Card title="title-sy">
        <p>Ini adalah konten di dalam card</p>
        <button>Klik Saya</button>
      </Card>

      <Counter />
      <FormNama />
      <FormUser/>
    </>
  );
}

export default App