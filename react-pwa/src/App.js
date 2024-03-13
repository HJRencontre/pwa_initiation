import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState({ team1: 0, team2: 0})
    useEffect(() => {
    fetch('http://localhost:3001/score')
      .then(response => response.json())
      .then(data => {
        setScore(data);
        console.log(data); // Log the score
      })
      .catch(error => console.error('Error:', error))
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <p>
          Team 1 Score: {score.team1}
        </p>
        <p>
          Team 2 Score: {score.team2}
        </p>
      </div>
    </div>
  );
}

export default App;