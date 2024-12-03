export function monteCarloSim(
  numComputers,
  infectionProb,
  dailyCleans,
  numSimulations
) {
  // Object to initialize arrays to track the number of days to remove the virus,
  // track how many computers were infected, and if a computer was infected or not for each simulation
  const results = {
    timesToClear: [],
    infectionCount: [],
    infectedOnceAcrossSimulations: Array(numComputers).fill(0), // Track how many simulations each computer was infected
  };

  for (let i = 0; i < numSimulations; i++) {
    let infected = Array(numComputers).fill(false); // Initial state of the computers
    let infectedOnce = Array(numComputers).fill(false); // Track if a computer was infected at least once
    infected[Math.floor(Math.random() * numComputers)] = true; // Random computer is infected
    let day = 0;

    while (infected.some((stillInfected) => stillInfected)) {
      day++;

      let newInfections = [...infected];
      infected.forEach((isInfected) => {
        if (isInfected) {
          for (let j = 0; j < numComputers; j++) {
            if (!infected[j] && Math.random() < infectionProb) {
              newInfections[j] = true;
            }
          }
        }
      });

      infected = newInfections;

      // Mark any newly infected computer as having been infected at least once
      infected.forEach((isInfected, i) => {
        if (isInfected) {
          infectedOnce[i] = true; // Track it as infected at least once
        }
      });

      const infectedComputers = infected
        .map((val, idx) => (val ? idx : -1))
        .filter((idx) => idx !== -1);

      // Clean the infected computers
      const numComputersToClean = Math.min(
        dailyCleans,
        infectedComputers.length
      );
      const computersToClean = infectedComputers.slice(0, numComputersToClean);
      computersToClean.forEach((idx) => {
        infected[idx] = false; // Clean the computer
      });
    }

    // After the simulation, count how many computers were infected at least once
    results.timesToClear.push(day);
    results.infectionCount.push(infectedOnce.filter(Boolean).length); // Count how many computers got infected at least once

    // Update the count of how many simulations each computer was infected in
    infectedOnce.forEach((wasInfected, idx) => {
      if (wasInfected) {
        results.infectedOnceAcrossSimulations[idx] += 1; // Increment the count for this computer
      }
    });
  }

  return {
    averageTimeToClear: parseFloat(
      (
        results.timesToClear.reduce((a, b) => a + b, 0) / numSimulations
      ).toFixed(4)
    ),

    probabilityOfInfection: results.infectedOnceAcrossSimulations.map((count) =>
      parseFloat((count / numSimulations).toFixed(4))
    ),

    averageNumOfInfections: parseFloat(
      (
        results.infectionCount.reduce((a, b) => a + b, 0) / numSimulations
      ).toFixed(4)
    ),
  };
}
