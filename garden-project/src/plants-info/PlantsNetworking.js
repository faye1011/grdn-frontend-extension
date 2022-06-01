export async function fetchPlantInfo() {
  const response = await fetch("http://garden-project.sigmalabs.co.uk/plants");
  const data = await response.json();
  return data;
}

export async function addPlantToGarden(plantInfoID, gardenID) {
  await fetch("http://garden-project.sigmalabs.co.uk/new-plant", {
    method: "POST",
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    body: JSON.stringify({ plantInfoID, gardenID }),
  });
}

export async function harvestPlant(plantID) {
  await fetch("http://garden-project.sigmalabs.co.uk/harvest", {
    method: "PATCH",
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    body: JSON.stringify({ plantID }),
  });
}

export async function plantPlant(plantID, quantity, date) {
  await fetch("http://garden-project.sigmalabs.co.uk/update-plant-status", {
    method: "PATCH",
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    body: JSON.stringify({ plantID, quantity, date }),
  });
}
