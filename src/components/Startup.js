import '../css/Startup.css';
function Startup(props) {
    return (
        <div className="startup">
            <h1>Quizzical</h1>
            <h4>It's a simple game, so just jump on it!</h4>
            <button onClick={props.changeGameState}>Start Quiz</button>
        </div>
    )
}

export default Startup;