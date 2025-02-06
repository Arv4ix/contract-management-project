import React, { useState, useEffect } from "react";
import axios from "axios";
import ContractList from "../contracts/ContractList";
import ContractFilter from "./ContractFilter";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const ContractListPage = () => {
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/contracts")
            .then(response => {
                setContracts(response.data);
                setFilteredContracts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load contracts. Please try again.");
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (filteredData) => {
        setFilteredContracts(filteredData);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Contract List</h2>
            <ContractFilter contracts={contracts} onFilterChange={handleFilterChange} />
            <ContractList contracts={filteredContracts} />
        </div>
    );
};

export default ContractListPage;
