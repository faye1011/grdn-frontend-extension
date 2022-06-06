import { Container, Accordion } from "react-bootstrap";
import { fetchPlantInfo, searchFilter } from "./PlantsNetworking";
import { useState, useEffect } from "react";
import PlantsInfo from "./PlantsInfo";
import SearchForm from "./SearchForm";
import "./plants-info.css";
import Header from "../Header";
import { fetchGardenInfo } from "../garden/GardenNetworking";

export default function PlantsInfoPage() {
  const [plantInfo, setPlantInfo] = useState([]);
  const [gardenInfo, setGardenInfo] = useState([]);

  useEffect(() => {
    async function getData() {
      await fetchInfo();
    }
    getData();
  }, []);

  async function fetchInfo() {
    const plantData = await fetchPlantInfo();
    setPlantInfo(plantData);
    const gardenData = await fetchGardenInfo(1); // placeholder number
    setGardenInfo(gardenData);
  }

  function checkAvoidInstructions(index) {
    let listOfGardenPlants = [];
    let avoidInstructions = plantInfo[index].avoid_instructions.split(":")[1];
    let samePlants = [];
    avoidInstructions = avoidInstructions.split(", ");

    gardenInfo.forEach((plant) =>
      listOfGardenPlants.push(plant.name.split(", "))
    );

    listOfGardenPlants = listOfGardenPlants.flat();
    for (let i = 0; i < listOfGardenPlants.length; i++) {
      for (let j = 0; j < avoidInstructions.length; j++) {
        if (listOfGardenPlants[i].includes(avoidInstructions[j])) {
          samePlants.push(listOfGardenPlants[i]);
        }
      }
    }
    return samePlants.toString();
  }

  function printPlantList() {
    return plantInfo.map((plant, i) => {
      return (
        <PlantsInfo
          key={i}
          index={i}
          activeKey={i}
          data={plant}
          checkAvoidInstructions={checkAvoidInstructions}
        />
      );
    });
  }

  function getFilterPlants(filteredPlants) {
    setPlantInfo(filteredPlants);
  }
  return (
    <div className="header-container">
      {<Header />}

      <Container>
        <div className="plant-list-title-wrapper">
          <h1 id="plant-list-h1">Plant List</h1>
        </div>

        <SearchForm
          className="align-items-center"
          searchFilter={searchFilter}
          getFilterPlants={getFilterPlants}
        />
        <Accordion defaultActiveKey="0" flush>
          {printPlantList()}
        </Accordion>
      </Container>
    </div>
  );
}
