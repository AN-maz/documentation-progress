import './App.css';

const App = () => {
    const active = true;

    return (
        <>
        <button className="btn"
                styles={{opacity:active ? 1 : 0.5}}>Click Me</button>
        </>
    );
};

export default App;