import React, { useState, useEffect } from "react";
import { getClients, createClient, deleteClient } from "../../api/clientApi";
import { useNavigate } from "react-router-dom";
import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const ClientsPage = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [error, setError] = useState(null);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const clients = await getClients();
            setClients(clients);
        } catch (error) {
            console.error("Error fetching clients:", error);
            setError("Failed to load clients. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchClients();
    }, []);

    // Handle adding new client
    const handleClientAdded = async (newClientData) => {
        try {
            const newClient = await createClient(newClientData);
            setClients(prevClients => [...prevClients, newClient]);
        } catch (error) {
            console.error("Error adding client:", error);
            setError("Failed to add client. Please try again.");
        }
    };

     // Handle editing a client
    const handleEdit = (clientId) => {
        navigate(`/clients/edit/${clientId}`);
    };

    // Handle deleting client
    const handleDelete = async (clientId) => {
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
            
            <ClientForm onClientAdded={handleClientAdded} fetchClients={fetchClients} selectedClient={selectedClient} setSelectedClient={setSelectedClient} />
            <ClientList clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default ClientsPage;
