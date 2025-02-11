import React, { useState, useEffect } from "react";
import { createContract, updateContract } from "../../api/contractApi";
import { getClients } from "../../api/clientApi";

const ContractForm = ({ fetchContracts, selectedContract, setSelectedContract }) => {
    const [formData, setFormData] = useState({
        contract_name: "",
        client_id: "",
        start_date: "",
        duration: "",
        comments: ""
    });

    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientsData = async () => {
            try {
                const clients = await getClients();
                console.log("Fetched Clients:", clients); // Debugging
                setClients(Array.isArray(clients) ? clients : []);
            } catch (error) {
                console.error("Error fetching clients:", error);
                setClients([]); // Prevents undefined error
            }
        };

        fetchClientsData();

        if (selectedContract) {
            setFormData({
                contract_name: selectedContract.name || "",
                client_id: selectedContract.client_id || "",
                start_date: selectedContract.start_date || "",
                duration: selectedContract.duration || "",
                comments: selectedContract.comment || ""
            });
        } else {
            setFormData({ contract_name: "", client_id: "", start_date: "", duration: "", comments: "" });
        }
    }, [selectedContract]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedContract) {
                await updateContract(selectedContract.id, formData);
            } else {
                await createContract(formData);
            }
            fetchContracts();
            setFormData({ contract_name: "", client_id: "", start_date: "", duration: "", comments: "" });
            setSelectedContract(null);
        } catch (error) {
            console.error("Error saving contract:", error);
            setError("Failed to save contract. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>{selectedContract ? "Edit Contract" : "Add Contract"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-2">
                <label>Contract Name:</label>
                <input type="text" name="contract_name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-2">
                <label>Client:</label>
                <select name="client_id" className="form-control" value={formData.client_id} onChange={handleChange} required>
                    <option value="">Select Client</option>
                    {clients.length > 0 ? (
                        clients.map(client => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))
                    ) : (
                        <option disabled>Loading clients...</option>
                    )}
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
                <textarea name="comments" className="form-control" value={formData.comment} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success">{selectedContract ? "Update" : "Add"} Contract</button>
        </form>
    );
};

export default ContractForm;
