import React, { useState, useEffect } from "react";
import { createContract, updateContract, deleteContract, getContractById } from "../../api/contractApi";
import { getClients } from "../../api/clientApi";
import { useParams, useNavigate } from "react-router-dom";

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
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientsData = async () => {
            try {
                const clients = await getClients();
                console.log("Loaded Clients:", clients); // Debugging
                setClients(Array.isArray(clients) ? clients : []);
            } catch (error) {
                console.error("Error loading clients:", error);
                setClients([]);
            }
        };

        fetchClientsData();

        if (selectedContract || id) {
            const fetchContract = async () => {
                try {
                    const response = selectedContract ? selectedContract : await getContractById(id);
                    setFormData({
                        contract_name: response.contract_name || "",
                        client_id: response.client_id || "",
                        start_date: response.start_date || "",
                        duration: response.duration || "",
                        comments: response.comments || ""
                    });
                    setSelectedContract(response);
                } catch (error) {
                    console.error("Error fetching contract:", error);
                    setError("Failed to load contract.");
                }
            };
            fetchContract();
        } else {
            setFormData({ contract_name: "", client_id: "", start_date: "", duration: "", comments: "" });
        }
    }, [selectedContract, id, setSelectedContract]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting Contract:", formData);
        
        try {
            if (selectedContract || id) {
                await updateContract(selectedContract ? selectedContract.id : id, formData);
            } else {
                await createContract(formData);
            }

            if (fetchContracts) {
                fetchContracts();
            } else {
                console.error("fetchContracts is not defined");
            }

            setFormData({ contract_name: "", client_id: "", start_date: "", duration: "", comments: "" });

            if (setSelectedContract) {
                setSelectedContract(null);
            } else {
                console.error("setSelectedContract is not defined");
            }

            navigate("/contracts");
        } catch (error) {
            console.error("Error saving contract:", error);
            setError("Failed to save contract. Please try again.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteContract(selectedContract ? selectedContract.id : id);
            fetchContracts();
            setFormData({ contract_name: "", client_id: "", start_date: "", duration:"", comments:"" });
            setSelectedContract(null);
            navigate("/contracts");
        } catch (error) {
            console.error("Error deleting contract:", error);
            setError("Failed to delete contract. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>{selectedContract || id ? "Edit Contract" : "Add Contract"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-2">
                <label>Contract Name:</label>
                <input type="text" name="contract_name" className="form-control" value={formData.contract_name} onChange={handleChange} required />
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
                <textarea name="comments" className="form-control" value={formData.comments} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success">{selectedContract || id ? "Update" : "Add"} Contract</button>
            {(selectedContract || id) && <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Contract</button>}
        </form>
    );
};

export default ContractForm;
