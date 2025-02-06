import React, { useState, useEffect } from "react";
import axios from "axios";

const ClientForm = ({ fetchClients, selectedClient, setSelectedClient }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

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
                await axios.put(`/api/clients/${selectedClient.id}`, formData);
            } else {
                await axios.post("/api/clients", formData);
            }
            fetchClients();
            setFormData({ name: "", email: "", phone: "" });
            setSelectedClient(null);
        } catch (error) {
            console.error("Error saving client:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>{selectedClient ? "Edit Client" : "Add Client"}</h3>
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
