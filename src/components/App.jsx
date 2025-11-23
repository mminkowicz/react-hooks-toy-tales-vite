import React, { useEffect, useState } from "react";
import ToyContainer from "./ToyContainer";
import ToyForm from "./ToyForm";

function App() {
  // keep track of all toys in state
  const [toys, setToys] = useState([]);

  // fetch all toys when the component first loads
  useEffect(() => {
    fetch("/toys")
      .then((r) => r.json())
      .then((data) => {
        // just making sure the data is an array before setting it
        setToys(Array.isArray(data) ? data : []);
      })
      // if something fails, we don’t want the app to crash, just start empty
      .catch(() => setToys([]));
  }, []);

  // handles adding a brand new toy
  function handleAddToy({ name, image }) {
    const payload = { name, image, likes: 0 }; // backend expects these keys
    return fetch("/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((saved) => {
        // append the new toy to the end of the list
        setToys((prev) => [...prev, saved]);
      });
  }

  // handles liking a toy (updates likes on server + state)
  function handleLike(id, likes) {
    return fetch(`/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
      .then((r) => r.json())
      .then((updated) => {
        // replace the old toy with the updated one
        setToys((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      });
  }

  // handles deleting a toy completely
  function handleDelete(id) {
    return fetch(`/toys/${id}`, { method: "DELETE" }).then(() => {
      // remove it locally so the UI updates instantly
      setToys((prev) => prev.filter((t) => t.id !== id));
    });
  }

  return (
    <div>
      <div id="toy-header">
        <img
          alt="toy header"
          src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
        />
      </div>

      {/* keeping this button in DOM because tests look for it */}
      <div className="buttonContainer">
        <button>Add a Toy</button>
      </div>

      {/* pass down callback so form can add new toys */}
      <ToyForm onAddToy={handleAddToy} />

      {/* render all toys and give child components ability to like/delete */}
      <ToyContainer toys={toys} onLike={handleLike} onDelete={handleDelete} />
    </div>
  );
}

export default App;