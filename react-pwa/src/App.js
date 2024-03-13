import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState({ team1: 0, team2: 0 });
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  function updateOnlineStatus() {
    setIsOnline(window.navigator.onLine);
  }

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  function getScore() {
    if (isOnline) {
      fetch('http://localhost:3001/score')
        .then(response => response.json())
        .then(data => {
          setScore(data);
          localStorage.setItem('score', JSON.stringify(data));
          console.log(data);
        })
        .catch(error => console.error('Error:', error));
    } else {
      setScore(JSON.parse(localStorage.getItem('score')));
    }
  }

  useEffect(() => {
    getScore();
    if (isOnline) {
      const interval = setInterval(() => {
        getScore();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isOnline]);

  return (
    <div className="App">
      <div className="App-header">
        <p>
          Team 1 Score: {score.team1}
        </p>
        <p>
          Team 2 Score: {score.team2}
        </p>
        {!isOnline && (
          <>
            <p>You are currently offline.</p>
            <button onClick={getScore}>Reload</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;