import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // Navigation bar
import WelcomePage from "./WelcomePage"; // Landing page
import ClientsPage from "./ClientsPage"; // Clients management
import ContractsPage from "./ContractsPage"; // Contracts management
import ContractListPage from "./ContractListPage"; // Contract filtering

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Persistent navigation across pages */}
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/contracts" element={<ContractsPage />} />
                    <Route path="/contract-list" element={<ContractListPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
