import React, { useState } from "react";
import { addClient } from "../services/apiService";

const AddClientPage = () => {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone_number: "",
    x_coordinate: "",
    y_coordinate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addClient(clientData);
    // Reset form or show success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={clientData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={clientData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="phone_number"
        value={clientData.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
      <input
        name="x_coordinate"
        type="number"
        value={clientData.x_coordinate}
        onChange={handleChange}
        placeholder="X Coordinate"
        required
      />
      <input
        name="y_coordinate"
        type="number"
        value={clientData.y_coordinate}
        onChange={handleChange}
        placeholder="Y Coordinate"
        required
      />
      <button type="submit">Add Client</button>
    </form>
  );
};

export default AddClientPage;
