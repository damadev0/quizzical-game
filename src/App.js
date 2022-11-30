import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Startup from './components/Startup'
import Quiz from "./components/Quiz"
import './App.css';

function App() {
  const [gameState, setGameState] = useState(false)

  const queryClient = new QueryClient()

  function changeGameState() {
    setGameState(prevGameState => !prevGameState)
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {!gameState ? <Startup changeGameState={changeGameState} /> : <Quiz changeGameState={changeGameState} />}
      </QueryClientProvider>
    </div>
  );
}

export default App;
