import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddClientPage from "./pages/AddClientPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-client" element={<AddClientPage />} />
      </Routes>
    </Router>
  );
}

export default App;
