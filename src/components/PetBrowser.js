import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  const petsToDisplay = pets.map(pet => <Pet pet={pet} onAdoptPet={onAdoptPet} key={pet.id} />)

  return <div className="ui cards">{petsToDisplay}</div>;
}

export default PetBrowser;
