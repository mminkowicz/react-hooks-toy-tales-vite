import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  // local state for controlled inputs
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // when form is submitted, call the handler from App
  function handleSubmit(e) {
    e.preventDefault();

    // trim to avoid whitespace-only input
    const trimmedName = name.trim();
    const trimmedImage = image.trim();

    if (!trimmedName) return; // don’t submit if name is blank

    // call up to App, which will handle the POST
    onAddToy({ name: trimmedName, image: trimmedImage }).finally(() => {
      // clear form inputs after submission
      setName("");
      setImage("");
    });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>

        {/* controlled input for name */}
        <input
          className="input-text"
          name="name"
          placeholder="Enter a toy's name..."
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        {/* controlled input for image URL */}
        <input
          className="input-text"
          name="image"
          placeholder="Enter a toy's image URL..."
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />

        {/* exact text required by tests */}
        <button className="submit" name="submit" type="submit">
          Create New Toy
        </button>
      </form>
    </div>
  );
}

export default ToyForm;