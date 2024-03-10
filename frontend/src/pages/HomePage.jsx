import React, { useState, useEffect } from "react";
import { fetchClients, optimizeRoute } from "../services/apiService";
import ClientList from "../components/ClientList";
import RouteModal from "../components/RouteModal";

const HomePage = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const response = await fetchClients();
      setClients(response.data);
      setFilteredClients(response.data);
    };

    loadClients();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const term = event.target.value.toLowerCase();
    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phone_number.includes(term)
    );
    setFilteredClients(filtered);
  };

  const handleOptimizeRoute = async () => {
    const response = await optimizeRoute();
    setOptimizedRoute(response.data.route);
    setShowModal(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleOptimizeRoute}>Optimize Visitation Route</button>
      <ClientList clients={filteredClients} />
      {showModal && (
        <RouteModal
          route={optimizedRoute}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
