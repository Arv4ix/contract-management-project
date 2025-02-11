import React, { useState, useEffect } from "react";
import { getClients, createClient, deleteClient } from "../../api/clientApi";
import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const clients = await getClients();
                setClients(clients);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching clients:", error);
                setError("Failed to load clients. Please try again.");
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const handleClientAdded = async (newClientData) => {
        try {
            const newClient = await createClient(newClientData);
            setClients(prevClients => [...prevClients, newClient]);
        } catch (error) {
            console.error("Error adding client:", error);
            setError("Failed to add client. Please try again.");
        }
    };

    const handleClientDeleted = async (clientId) => {
        try {
            await deleteClient(clientId);
            setClients(prevClients => prevClients.filter(client => client.id !== clientId));
        } catch (error) {
            console.error("Error deleting client:", error);
            setError("Failed to delete client. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Clients</h2>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            
            <ClientForm onClientAdded={handleClientAdded} />
            <ClientList clients={clients} onClientDeleted={handleClientDeleted} />
        </div>
    );
};

export default ClientsPage;
