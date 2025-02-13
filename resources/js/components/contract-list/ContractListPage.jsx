import React, { useState, useEffect } from "react";
import { getContracts, updateContract, deleteContract } from "../../api/contractApi";
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
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        setLoading(true);
        try {
            const contracts = await getContracts();
            setContracts(contracts);
            setFilteredContracts(contracts);
        } catch (error) {
            console.error("Error fetching contracts:", error);
            setError("Failed to load contracts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Apply filtering inside ContractListPage
    const handleFilterChange = (filters) => {
        let filtered = contracts;

        if (filters.clientName) {
            filtered = filtered.filter(contract =>
                contract.client?.name?.toLowerCase().includes(filters.clientName.toLowerCase())
            );
        }

        if (filters.contractName) {
            filtered = filtered.filter(contract =>
                contract.contract_name?.toLowerCase().includes(filters.contractName.toLowerCase())
            );
        }

        if (filters.startDate) {
            filtered = filtered.filter(contract =>
                contract.start_date === filters.startDate
            );
        }

        if (filters.duration) {
            filtered = filtered.filter(contract =>
                contract.duration === parseInt(filters.duration)
            );
        }

        setFilteredContracts(filtered);
    };

    // Handle contract update
    const handleEditContract = async (id, updatedData) => {
        try {
            await updateContract(id, updatedData);
            fetchContracts();
        } catch (error) {
            console.error("Error updating contract:", error);
            setError("Failed to update contract.");
        }
    };

    // Handle contract deletion
    const handleDeleteContract = async (id) => {
        try {
            await deleteContract(id);
            fetchContracts();
        } catch (error) {
            console.error("Error deleting contract:", error);
            setError("Failed to delete contract.");
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Contract List</h2>
            <ContractFilter contracts={contracts} onFilterChange={handleFilterChange} />
            <ContractList contracts={filteredContracts} onEdit={handleEditContract} onDelete={handleDeleteContract} />
        </div>
    );
};

export default ContractListPage;
