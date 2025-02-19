import React, { useState, useEffect } from "react";
import { getContracts, createContract, deleteContract } from "../../api/contractApi";
import ContractList from "./ContractList";
import ContractForm from "./ContractForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import { useNavigate } from "react-router-dom";

const ContractsPage = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedContract, setSelectedContract] = useState(null);
    const navigate = useNavigate();

    const fetchContracts = async () => {
        setLoading(true);
        try {
            const contracts = await getContracts();
            console.log("Processed Contracts:", contracts); // Debugging
            setContracts(contracts);
        } catch (error) {
            console.error("Error fetching contracts:", error);
            setError("Failed to load contracts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    // Handle adding new contract 
    const handleContractAdded = async (newContractData) => {
        try {
            await createContract(newContractData);
            fetchContracts();
        } catch (error) {
            console.error("Error adding contract:", error);
            setError("Failed to add contract. Please try again.");
        }
    };

    // Handle editing contracts 
    const handleEdit = (contractId) => {
        setSelectedContract(contractId);
        navigate(`/contracts/edit/${contractId}`);
    };

    // Handle deleting contracts
    const handleDelete = async (contractId) => {
        if (window.confirm("Are you sure you want to delete this contract?")) {
            try {
                await deleteContract(contractId);
                fetchContracts();
            } catch (error) {
                console.error("Error deleting contract:", error);
                setError("Failed to delete contract. Please try again.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Contracts</h2>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            
            <ContractForm onContractAdded={handleContractAdded} fetchContracts={fetchContracts} selectedContract={selectedContract} setSelectedContract={setSelectedContract} />
            <ContractList contracts={contracts} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ContractsPage;
