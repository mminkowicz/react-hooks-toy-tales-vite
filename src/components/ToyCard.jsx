import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  const likes = typeof toy.likes === "number" ? toy.likes : 0;

  function handleLikeClick() {
    onLike(toy.id, likes + 1);
  }

  function handleDeleteClick() {
    onDelete(toy.id);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      {/* test expects exact text "X Likes " (note space before </p>) */}
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like &lt;3
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;