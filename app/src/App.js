import React, { useState } from 'react';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [guess, setGuess] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const startNewGame = () => {
    setLoading(true);
    setGuess('');
    setResult(null);
    fetch('http://localhost:8080/partita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setGame(data);
      setLoading(false);
    })
  };

  const submitGuess = () => {
    setLoading(true);
    fetch(`http://localhost:8080/partita/${game.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numero: guess }),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data);
      setGame(prevGame => ({ ...prevGame, tentativi: data.tentativi }));
      setLoading(false);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Indovina il numero</h1>
        <button onClick={startNewGame}>Nuova partita</button>
        <hr />
        { 
          loading ? 
            <div>In caricamento... </div>
          :
            game ? (
              <div>
                <p>Game ID: {game.id}</p>
                {result && result.risultato === 0 ? (
                  <p>Hai indovinato il numero!</p>
                ) : (
                  <>
                    <input type="number" min="1" max="100" value={guess} onChange={e => setGuess(e.target.value)} />
                    <button onClick={submitGuess}>Invia</button>
                  </>
                )}
                {result && <p>Risultato: {result.risultato}, Tentativi: {game.tentativi}</p>}
              </div>
            ) : null
        }
      </header>
    </div>
  );
}

export default App;