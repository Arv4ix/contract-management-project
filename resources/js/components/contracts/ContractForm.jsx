import React, { useState, useEffect } from "react";
import { createContract, updateContract, deleteContract, getContractById } from "../../api/contractApi";
import { getClients } from "../../api/clientApi";
import { useParams, useNavigate } from "react-router-dom";

const ContractForm = ({ fetchContracts, selectedContract, setSelectedContract }) => {
    const [formData, setFormData] = useState({
        contract_name: "",
        client_id: "",
        start_date: "",
        duration: 1,
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

        if (selectedContract) {
            setFormData({
                contract_name: selectedContract.contract_name || "",
                client_id: selectedContract.client_id || "",
                start_date: selectedContract.start_date || "",
                duration: selectedContract.duration ? Number(selectedContract.duration) : 1,
                comments: selectedContract.comments || ""
            });
        } else if (id && !selectedContract) {
            const fetchContract = async () => {
                try {
                    const response = await getContractById(id);
                    if (!response) throw new Error("Invalid contract data received.");

                    setFormData({
                        contract_name: response.contract_name || "",
                        client_id: response.client_id || "",
                        start_date: response.start_date || "",
                        duration: response.duration ? Number(response.duration) : 1,
                        comments: response.comments || ""
                    });

                    if (setSelectedContract) {
                        setSelectedContract(response);
                    }
                } catch (error) {
                    console.error("Error fetching contract:", error);
                    setError("Failed to load contract.");
                }
            };
            fetchContract();
        }
    }, [selectedContract, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ 
            ...formData, 
            [name]: name === "duration" ? (isNaN(value) || value === "" ? 1 : Number(value)) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.duration < 1) {
            setError("Duration must be at least 1 month.");
            return;
        }
        
        try {
            if (selectedContract?.id || id) {
                await updateContract(selectedContract?.id || id, formData);
            } else {
                await createContract(formData);
            }

            fetchContracts?.();
            setFormData({ contract_name: "", client_id: "", start_date: "", duration: 1, comments: "" });

            if (setSelectedContract) {
                setSelectedContract(null);
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
            fetchContracts?.();
            setFormData({ contract_name: "", client_id: "", start_date: "", duration:"", comments:"" });
            setSelectedContract?.(null);
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
