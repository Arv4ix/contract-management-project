import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/clients")
            .then(response => {
                setClients(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load clients. Please try again.");
                setLoading(false);
            });
    }, []);

    const handleClientAdded = (newClient) => {
        setClients([...clients, newClient]);
    };

    const handleClientDeleted = (clientId) => {
        setClients(clients.filter(client => client.id !== clientId));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Clients</h2>
            <ClientForm onClientAdded={handleClientAdded} />
            <ClientList clients={clients} onClientDeleted={handleClientDeleted} />
        </div>
    );
};

export default ClientsPage;
