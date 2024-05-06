import React, { useState } from 'react';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [guess, setGuess] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const startNewGame = () => {
    setLoading(true);
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
    .catch((error) => {
      console.error('Error:', error);
      setLoading(false);
    });
  };

  const ilnumero = () => {
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
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setLoading(false);
    });
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
                <p>Tentativo: {game.tentativi}</p>
                <input type="number" min="1" max="100" value={guess} onChange={e => setGuess(e.target.value)} />
                <button onClick={ilnumero}>Invia</button>
                {result && <p>Risultato: {result.risultato}, Tentativi: {result.tentativi}</p>}
              </div>
            ) : (
              <p>Clicca "Nuova partita" per iniziare la nuova partita</p>
            )
        }
      </header>
    </div>
  );
}

export default App;