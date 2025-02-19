import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContracts, deleteContract } from "../../api/contractApi";
import ContractList from "../contracts/ContractList";
import ContractFilter from "./ContractFilter";
import ContractForm from "../contracts/ContractForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const ContractListPage = () => {
    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [clientNames, setClientNames] = useState([]);
    const [contractNames, setContractNames] = useState([]);
    const [startDates, setStartDates] = useState([]);
    const [durations, setDurations] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        setLoading(true);
        try {
            const contracts = await getContracts();
            setContracts(contracts);
            setFilteredContracts(contracts);
            extractFilterOptions(contracts);
        } catch (error) {
            console.error("Error fetching contracts:", error);
            setError("Failed to load contracts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Filter input options
    const extractFilterOptions = (contracts) => {
        setClientNames([...new Set(contracts.map(contract => contract.client?.name).filter(Boolean))]);
        setContractNames([...new Set(contracts.map(contract => contract.contract_name).filter(Boolean))]);
        setStartDates([...new Set(contracts.map(contract => contract.start_date).filter(Boolean))]);
        setDurations([...new Set(contracts.map(contract => contract.duration).filter(Boolean))]);
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
    const handleEdit = (contractId) => {
        setSelectedContract(contractId);
        navigate(`/contracts/edit/${contractId}`);
    };

    // Handle contract deletion
    const handleDelete = async (contractId) => {
        if (window.confirm("Are you sure you want to delete this contract?")) {
            try {
                await deleteContract(contractId);
                fetchContracts();
            } catch (error) {
                console.error("Error deleting contract:", error);
                setError("Failed to delete contract.");
            }
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Contract List</h2>
            <ContractFilter 
                contracts={contracts} 
                clientNames={clientNames}
                contractNames={contractNames}
                startDates={startDates}
                durations={durations}
                onFilterChange={handleFilterChange} 
            />
            <ContractList 
                contracts={filteredContracts} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
            <ContractForm
                fetchContracts={fetchContracts}
                selectedContract={selectedContract}
                setSelectedContract={setSelectedContract}
            />
        </div>
    );
};

export default ContractListPage;
