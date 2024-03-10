// src/components/ClientList.jsx
import React, { useState, useEffect } from "react";

const ClientList = ({ clients, onEdit, onDelete }) => {
  const [filter, setFilter] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);

  useEffect(() => {
    setFilteredClients(
      clients.filter(
        (client) =>
          client.name.toLowerCase().includes(filter.toLowerCase()) ||
          client.email.toLowerCase().includes(filter.toLowerCase()) ||
          client.phone_number.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, clients]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter clients..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredClients.map((client, index) => (
          <li key={index}>
            {client.name} - {client.email} - {client.phone_number} -
            Coordinates: ({client.x_coordinate}, {client.y_coordinate})
            <button onClick={() => onEdit(client.id)}>Edit</button>
            <button onClick={() => onDelete(client.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
