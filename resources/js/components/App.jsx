import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientsPage from "./clients/ClientsPage";
import ContractsPage from "./contracts/ContractsPage";
import ContractListPage from "./contract-list/ContractListPage";
import WelcomePage from "./welcome/WelcomePage";
import Navbar from "./common/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/contract-list" element={<ContractListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
