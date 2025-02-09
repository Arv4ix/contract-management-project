import axios from "axios";

const API_URL = "/api/contracts"; // Base API endpoint

// Fetch all contracts
export const getContracts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch contracts.");
    }
};

// Fetch a single contract by ID
export const getContractById = async (contractId) => {
    try {
        const response = await axios.get(`${API_URL}/${contractId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch contract details.");
    }
};

// Create a new contract
export const createContract = async (contractData) => {
    try {
        const response = await axios.post(API_URL, contractData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create contract.");
    }
};

// Update an existing contract
export const updateContract = async (contractId, contractData) => {
    try {
        const response = await axios.put(`${API_URL}/${contractId}`, contractData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update contract.");
    }
};

// Delete a contract
export const deleteContract = async (contractId) => {
    try {
        await axios.delete(`${API_URL}/${contractId}`);
        return { success: true };
    } catch (error) {
        throw new Error("Failed to delete contract.");
    }
};
