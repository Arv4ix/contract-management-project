import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import WelcomePage from './components/welcome/WelcomePage';
import ClientsPage from './components/clients/ClientsPage';
import ContractsPage from './components/contracts/ContractsPage';
import ContractListPage from './components/contract-list/ContractListPage';

// Import common components
import Navbar from './components/Navbar'; 

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Navigation Bar for all pages */}
            <div className="container">
                <Routes>
                    <Route path="/" element={<WelcomePage />} />  {/* Landing Page */}
                    <Route path="/clients" element={<ClientsPage />} />  {/* Clients Page */}
                    <Route path="/contracts" element={<ContractsPage />} />  {/* Contracts Page */}
                    <Route path="/contract-list" element={<ContractListPage />} />  {/* Contract List Page */}
                </Routes>
            </div>
        </Router>
    );
};

// Find the root element and render the app
const rootElement = document.getElementById('app');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

export default App;