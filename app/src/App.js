import React, { useState } from 'react';
import './App.css';

function App() {
  const [game, setGame] = useState(null);
  const [Indovina, impostaIndovina] = useState('');
  const [caricamento, setLoading] = useState(false);
  const [risultato, setResult] = useState(null);

  const inzianuovogioco = () => {
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
      body: JSON.stringify({ numero: Indovina }),
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
        <button onClick={inzianuovogioco}>Nuova partita</button>
        <hr/>
        {
          caricamento ? 
            <div>In caricamento...</div>
          :
            game ? (
              <div>
                <p>Game ID: {game.id}</p>
                <p>Inserisci un numero tra 1 e 100</p>
                <input type="text" value={Indovina} onChange={e => impostaIndovina(e.target.value)} />
                <button onClick={ilnumero}>Invia</button>
                {risultato && <p>Risultato: {risultato.risultato}, Tentativi: {risultato.tentativi}</p>}
              </div>
            ) : null
        }
      </header>
    </div>
  );
}

export default App;