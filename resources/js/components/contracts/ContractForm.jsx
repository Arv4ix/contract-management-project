import React, { useState, useEffect } from "react";
import axios from "axios";

const ContractForm = ({ fetchContracts, selectedContract, setSelectedContract }) => {
    const [formData, setFormData] = useState({
        name: "",
        client_id: "",
        start_date: "",
        duration: "",
        comment: ""
    });

    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
        if (selectedContract) {
            setFormData({
                name: selectedContract.name,
                client_id: selectedContract.client_id,
                start_date: selectedContract.start_date,
                duration: selectedContract.duration,
                comment: selectedContract.comment
            });
        }
    }, [selectedContract]);

    const fetchClients = async () => {
        try {
            const response = await axios.get("/api/clients");
            setClients(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedContract) {
                await axios.put(`/api/contracts/${selectedContract.id}`, formData);
            } else {
                await axios.post("/api/contracts", formData);
            }
            fetchContracts();
            setFormData({ name: "", client_id: "", start_date: "", duration: "", comment: "" });
            setSelectedContract(null);
        } catch (error) {
            console.error("Error saving contract:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>{selectedContract ? "Edit Contract" : "Add Contract"}</h3>
            <div className="mb-2">
                <label>Contract Name:</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Client:</label>
                <select name="client_id" className="form-control" value={formData.client_id} onChange={handleChange} required>
                    <option value="">Select Client</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label>Start Date:</label>
                <input type="date" name="start_date" className="form-control" value={formData.start_date} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Duration (months):</label>
                <input type="number" name="duration" className="form-control" value={formData.duration} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Comments:</label>
                <textarea name="comment" className="form-control" value={formData.comment} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success">{selectedContract ? "Update" : "Add"} Contract</button>
        </form>
    );
};

export default ContractForm;
