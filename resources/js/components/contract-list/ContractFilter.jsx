import React, { useState } from "react";

const ContractFilter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        clientName: "",
        contractName: "",
        startDate: "",
        duration: ""
    });

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
                    />
                </div>
                <div className="col-md-3">
                    <label>Contract Name:</label>
                    <input
                        type="text"
                        name="contractName"
                        className="form-control"
                        value={filters.contractName}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={filters.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <label>Duration (months):</label>
                    <input
                        type="number"
                        name="duration"
                        className="form-control"
                        value={filters.duration}
                        onChange={handleChange}
                    />
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
