import React, { useState } from "react";
import { monteCarloSim } from "./monteCarloSim";

function App() {
  const [numComputers, setNumComputers] = useState(20);
  const [infectionProb, setInfectionProb] = useState(0.1);
  const [dailyCleans, setDailyCleans] = useState(5);
  const [numSimulations, setNumSimulations] = useState(10000);
  const [results, setResults] = useState(null);

  document.title = "Computer Virus Simulation";

  const runSimulation = () => {
    const simulationResults = monteCarloSim(
      numComputers,
      infectionProb,
      dailyCleans,
      numSimulations
    );
    setResults(simulationResults);
  };

  return (
    <div className="App">
      <h1>Computer Virus Simulation</h1>
      <div>
        <label>Number of computers: </label>
        <input
          type="number"
          value={numComputers}
          onChange={(e) => setNumComputers(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <label>Infection Probability: </label>
        <input
          type="number"
          value={infectionProb}
          step="0.1"
          onChange={(e) => setInfectionProb(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <label>Daily Cleans: </label>
        <input
          type="number"
          value={dailyCleans}
          onChange={(e) => setDailyCleans(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <label>Number of Simulations: </label>
        <input
          type="number"
          value={numSimulations}
          onChange={(e) => setNumSimulations(Number(e.target.value))}
        ></input>
      </div>
      <button onClick={runSimulation}>Run Simulation</button>

      {results && (
        <div>
          <h2>Simulation Results</h2>
          <p>
            Average Time to Clear Virus in Days: {results.averageTimeToClear}
          </p>
          <p>
            Average Number of Computers Infected:{" "}
            {results.averageNumOfInfections}
          </p>
          <h3>Probability of Infection for Each Computer: </h3>
          <ul>
            {results.probabilityOfInfection.map((prob, idx) => (
              <li key={idx}>
                Computer {idx + 1}: {prob}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
