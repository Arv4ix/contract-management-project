import React, { useState, useEffect } from "react";
import { getContracts, createContract } from "../../api/contractApi";
import ContractList from "./ContractList";
import ContractForm from "./ContractForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const ContractsPage = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const contracts = await getContracts();
                setContracts(contracts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching contracts:", error);
                setError("Failed to load contracts. Please try again.");
                setLoading(false);
            }
        };

        fetchContracts();
    }, []);

    const handleContractAdded = async (newContractData) => {
        try {
            const newContract = await createContract(newContractData);
            setContracts([...contracts, newContract]);
        } catch (error) {
            console.error("Error adding contract:", error);
            setError("Failed to add contract. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Contracts</h2>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            
            <ContractForm onContractAdded={handleContractAdded} />
            <ContractList contracts={contracts} />
        </div>
    );
};

export default ContractsPage;
