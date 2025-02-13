import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientsPage from "./clients/ClientsPage";
import ClientForm from "./clients/ClientForm";
import ContractsPage from "./contracts/ContractsPage";
import ContractForm from "./contracts/ContractForm";
import ContractListPage from "./contract-list/ContractListPage";
import WelcomePage from "./welcome/WelcomePage";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/edit/:id" element={<ClientForm />} />
        <Route path="/clients/add" element={<ClientForm />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/contracts/edit/:id" element={<ContractForm />} />
        <Route path="/contracts/add" element={<ContractForm />} />
        <Route path="/contract-list" element={<ContractListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
