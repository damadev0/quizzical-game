import { useState } from "react"
import Startup from "./components/Startup"
import Quiz from "./components/Quiz"
import "./App.css"

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  function finishGame() {
    setGameStarted(false)
  }

  function startGame() {
    setGameStarted(true)
  }

  return (
    <div className="App h-screen my-8">
      {!gameStarted ? (
        <Startup startGame={startGame} />
      ) : (
        <Quiz finishGame={finishGame} />
      )}
    </div>
  )
}

export default App
