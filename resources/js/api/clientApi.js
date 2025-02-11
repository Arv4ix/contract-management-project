import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/clients"; // Base API endpoint

// Common function to extract error messages
const handleError = (error, defaultMessage) => {
    console.error(error.response?.data || error.message); // Log the actual response error
    throw new Error(error.response?.data?.message || defaultMessage);
};

// Fetch all clients
export const getClients = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Accept: "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, "Failed to fetch clients.");
    }
};

// Fetch a single client by ID
export const getClientById = async (clientId) => {
    try {
        const response = await axios.get(`${API_URL}/${clientId}`, {
            headers: { Accept: "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, `Failed to fetch client details for ID: ${clientId}.`);
    }
};

// Create a new client
export const createClient = async (clientData) => {
    try {
        const response = await axios.post(API_URL, clientData, {
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, "Failed to create client.");
    }
};

// Update an existing client
export const updateClient = async (clientId, clientData) => {
    try {
        const response = await axios.put(`${API_URL}/${clientId}`, clientData, {
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        handleError(error, `Failed to update client with ID: ${clientId}.`);
    }
};

// Delete a client
export const deleteClient = async (clientId) => {
    try {
        const response = await axios.delete(`${API_URL}/${clientId}`, {
            headers: { Accept: "application/json" },
        });
        return response.data || { success: true };
    } catch (error) {
        handleError(error, `Failed to delete client with ID: ${clientId}.`);
    }
};
