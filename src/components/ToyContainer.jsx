import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLike, onDelete }) {
  // just mapping through toys and rendering each one as a ToyCard
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} onLike={onLike} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ToyContainer;