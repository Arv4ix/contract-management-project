import React, { useState, useEffect } from "react";
import axios from "axios";
import ContractList from "./ContractList";
import ContractForm from "./ContractForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const ContractsPage = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/contracts")
            .then(response => {
                setContracts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load contracts. Please try again.");
                setLoading(false);
            });
    }, []);

    const handleContractAdded = (newContract) => {
        setContracts([...contracts, newContract]);
    };

    const handleContractDeleted = (contractId) => {
        setContracts(contracts.filter(contract => contract.id !== contractId));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Contracts</h2>
            <ContractForm onContractAdded={handleContractAdded} />
            <ContractList contracts={contracts} onContractDeleted={handleContractDeleted} />
        </div>
    );
};

export default ContractsPage;
