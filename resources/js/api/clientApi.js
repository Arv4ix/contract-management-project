import axios from "axios";

const API_URL = "/api/clients"; // Base API endpoint

// Fetch all clients
export const getClients = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch clients.");
    }
};

// Fetch a single client by ID
export const getClientById = async (clientId) => {
    try {
        const response = await axios.get(`${API_URL}/${clientId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch client details.");
    }
};

// Create a new client
export const createClient = async (clientData) => {
    try {
        const response = await axios.post(API_URL, clientData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create client.");
    }
};

// Update an existing client
export const updateClient = async (clientId, clientData) => {
    try {
        const response = await axios.put(`${API_URL}/${clientId}`, clientData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update client.");
    }
};

// Delete a client
export const deleteClient = async (clientId) => {
    try {
        await axios.delete(`${API_URL}/${clientId}`);
        return { success: true };
    } catch (error) {
        throw new Error("Failed to delete client.");
    }
};
