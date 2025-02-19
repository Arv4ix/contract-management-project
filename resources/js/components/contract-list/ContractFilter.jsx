import React, { useState, useEffect } from "react";

const ContractFilter = ({ contracts, onFilterChange }) => {
    const [filters, setFilters] = useState({
        clientName: "",
        contractName: "",
        startDate: "",
        duration: ""
    });

    const [uniqueClients, setUniqueClients] = useState([]);
    const [uniqueContracts, setUniqueContracts] = useState([]);
    const [uniqueStartDates, setUniqueStartDates] = useState([]);
    const [uniqueDurations, setUniqueDurations] = useState([]);

    useEffect(() => {
        const clients = [...new Set(contracts.map(contract => contract.client?.name).filter(Boolean))];
        const contractNames = [...new Set(contracts.map(contract => contract.contract_name).filter(Boolean))];
        const startDates = [...new Set(contracts.map(contract => contract.start_date).filter(Boolean))];
        const durations = [...new Set(contracts.map(contract => contract.duration).filter(Boolean))];

        setUniqueClients(clients);
        setUniqueContracts(contractNames);
        setUniqueStartDates(startDates);
        setUniqueDurations(durations);
    }, [contracts])

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    const handleReset = () => {
        setFilters({
            clientName: "",
            contractName: "",
            startDate: "",
            duration: ""
        });
        onFilterChange({});
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h4>Filter Contracts</h4>
            <div className="row">
                <div className="col-md-3">
                    <label>Client Name:</label>
                    <input
                        type="text"
                        name="clientName"
                        className="form-control"
                        value={filters.clientName}
                        onChange={handleChange}
                        placeholder="Type or select client name"
                        list="clientOptions"
                    />
                    <datalist id="clientOptions">
                        {uniqueClients.map((client, index) => (
                            <option key={index} value={client} />
                        ))}
                    </datalist>
                </div>
                <div className="col-md-3">
                    <label>Contract Name:</label>
                    <input
                        type="text"
                        name="contractName"
                        className="form-control"
                        value={filters.contractName}
                        onChange={handleChange}
                        placeholder="Type or select contract name"
                        list="contractOptions"
                    />
                    <datalist id="contractOptions">
                        {uniqueContracts.map((contract, index) => (
                            <option key={index} value={contract} />
                        ))}
                    </datalist>
                </div>
                <div className="col-md-3">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={filters.startDate}
                        onChange={handleChange}
                        list="startDateOptions"
                    />
                    <datalist id="startDateOptions">
                        {uniqueStartDates.map((date, index) => (
                            <option key={index} value={date} />
                        ))}
                    </datalist>
                </div>
                <div className="col-md-3">
                    <label>Duration (months):</label>
                    <input
                        type="number"
                        name="duration"
                        className="form-control"
                        value={filters.duration}
                        onChange={handleChange}
                        placeholder="Type or select duration"
                        list="durationOptions"
                    />
                    <datalist id="durationOptions">
                        {uniqueDurations.map((duration, index) => (
                            <option key={index} value={duration} />
                        ))}
                    </datalist>
                </div>
            </div>
            <div className="mt-2">
                <button type="submit" className="btn btn-primary">
                    Apply Filters
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </form>
    );
};

export default ContractFilter;
