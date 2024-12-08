export function monteCarloSim(
  numComputers,
  infectionProb,
  dailyCleans,
  numSimulations
) {
  const results = {
    timesToClear: [],
    infectionCount: [],
    infectedOnceAcrossSimulations: Array(numComputers).fill(0),
  };

  for (let sim = 0; sim < numSimulations; sim++) {
    const infectedOnce = new Set();
    let infectedQueue = [Math.floor(Math.random() * numComputers)]; // Virus randomly infects one computer in the morning
    infectedOnce.add(infectedQueue[0]);
    let day = 0;

    while (infectedQueue.length > 0) {
      day++;

      // Infection attempts to spread
      const newlyInfected = new Set();
      for (const current of infectedQueue) {
        for (let j = 0; j < numComputers; j++) {
          if (!infectedOnce.has(j) && Math.random() < infectionProb) {
            newlyInfected.add(j);
          }
        }
      }

      // Mark newly infected computers
      newlyInfected.forEach((computer) => infectedOnce.add(computer));

      // Clean up to dailyCleans (5) infected computers from newlyInfected
      const infectedList = Array.from(newlyInfected);
      const toClean = new Set();
      while (toClean.size < Math.min(dailyCleans, infectedList.length)) {
        const idx = Math.floor(Math.random() * infectedList.length);
        toClean.add(infectedList[idx]);
      }
      toClean.forEach((computer) => newlyInfected.delete(computer));

      // Update infectedQueue for next day
      infectedQueue = Array.from(newlyInfected);
    }

    // Store results for current simulation
    results.timesToClear.push(day);
    results.infectionCount.push(infectedOnce.size);
    infectedOnce.forEach((computer) => {
      results.infectedOnceAcrossSimulations[computer]++;
    });
  }

  return {
    averageTimeToClear: parseFloat(
      (
        results.timesToClear.reduce((acc, curr) => acc + curr, 0) /
        numSimulations
      ).toFixed(4)
    ),
    probabilityOfInfection: results.infectedOnceAcrossSimulations.map((count) =>
      parseFloat((count / numSimulations).toFixed(4))
    ),
    averageNumOfInfections: parseFloat(
      (
        results.infectionCount.reduce((acc, curr) => acc + curr, 0) /
        numSimulations
      ).toFixed(4)
    ),
  };
}
