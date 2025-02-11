import React, { useState, useEffect } from "react";
import { createClient, updateClient } from "../../api/clientApi";

const ClientForm = ({ fetchClients, selectedClient, setSelectedClient }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedClient) {
            setFormData({ 
                name: selectedClient.name, 
                email: selectedClient.email, 
                phone: selectedClient.phone 
            });
        }
    }, [selectedClient]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedClient) {
                await updateClient(selectedClient.id, formData);
            } else {
                await createClient( formData );
            }
            fetchClients();
            setFormData({ name: "", email: "", phone: "" });
            setSelectedClient(null);
        } catch (error) {
            console.error("Error saving client:", error);
            setError("Failed to save client. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>{selectedClient ? "Edit Client" : "Add Client"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-2">
                <label>Name:</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Email:</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Phone:</label>
                <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-success">{selectedClient ? "Update" : "Add"} Client</button>
        </form>
    );
};

export default ClientForm;
