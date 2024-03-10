// src/components/RouteModal.jsx
import React from "react";

const RouteModal = ({ isOpen, onClose, optimizedRoute }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "30%",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <h2>Optimized Route</h2>
      <ul>
        {optimizedRoute.map((client, index) => (
          <li key={index}>
            {index + 1}. {client.name} - Coordinates: ({client.x_coordinate},{" "}
            {client.y_coordinate})
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RouteModal;
