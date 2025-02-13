import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createClient, updateClient, getClientById } from "../../api/clientApi";

const ClientForm = ({ fetchClients }) => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [selectedClient, setSelectedClient] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                try {
                    const client = await getClientById(id);
                    setFormData({ name: client.name, email: client.email, phone: client.phone });
                    setSelectedClient(client);
                } catch (error) {
                    console.error("Error fetching client:", error);
                    setError("Failed to load client details.");
                }
            };
            fetchClient();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting client data:", formData); // Debugging log

        try {
            if (selectedClient && selectedClient.id) {
                await updateClient(selectedClient.id, formData);
            } else {
                await createClient(formData);
            }
            if (fetchClients) {
                fetchClients();
            } else {
                console.error("fetchClients is not defined");
            }

            setFormData({ name: "", email: "", phone: "" });
            setSelectedClient(null);
            navigate("/clients"); 
        } catch (error) {
            console.error("Error saving client:", error);
            setError("Failed to save client. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h3>{id ? "Edit Client" : "Add Client"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-3">
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
                <button type="submit" className="btn btn-success">{id ? "Update" : "Add"} Client</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/clients")}>Cancel</button>
            </form>
        </div>
    );
};

export default ClientForm;
