import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function onChangeType(e) {
    setFilters({type: e.target.value})
  }

  function onFindPetsClick() {
    let petUrl
    switch (filters.type) {
      case "cat":
        petUrl = "/pets?type=cat"
        break 
      case "dog":
        petUrl = "/pets?type=dog"
        break 
      case "micropig":
        petUrl = "/pets?type=micropig"
        break 
      default:
        petUrl = "/pets"
    }
    fetch(`http://localhost:3001${petUrl}`)
    .then(resp => resp.json())
    .then(data => setPets(data))
  }

  function onAdoptPet(id) {
    const adoptedPet = pets.filter(pet => pet.id ===id)
    fetch(`http://localhost:3001/pets/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        ...adoptedPet[0],
        isAdopted: true
      })
    })
    .then(resp => resp.json())
    .then(data => setPets([...pets]))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
