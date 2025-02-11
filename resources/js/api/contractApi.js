import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/contracts"; // Base API endpoint

// Common function to extract error messages
const handleError = (error, defaultMessage) => {
    console.error(error.response?.data || error.message); // Log actual response error
    throw new Error(error.response?.data?.message || defaultMessage);
};

// Fetch all contracts
export const getContracts = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Accept: "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, "Failed to fetch contracts.");
    }
};

// Fetch a single contract by ID
export const getContractById = async (contractId) => {
    try {
        const response = await axios.get(`${API_URL}/${contractId}`, {
            headers: { Accept: "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, `Failed to fetch contract details for ID: ${contractId}.`);
    }
};

// Create a new contract
export const createContract = async (contractData) => {
    try {
        const response = await axios.post(API_URL, contractData, {
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, "Failed to create contract.");
    }
};

// Update an existing contract
export const updateContract = async (contractId, contractData) => {
    try {
        const response = await axios.put(`${API_URL}/${contractId}`, contractData, {
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, `Failed to update contract with ID: ${contractId}.`);
    }
};

// Delete a contract
export const deleteContract = async (contractId) => {
    try {
        const response = await axios.delete(`${API_URL}/${contractId}`, {
            headers: { Accept: "application/json" },
        });
        return response.data || { success: true };
    } catch (error) {
        handleError(error, `Failed to delete contract with ID: ${contractId}.`);
    }
};
