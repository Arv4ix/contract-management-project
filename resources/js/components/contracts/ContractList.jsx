import React from "react";
import ContractDetail from "./ContractDetail";

const ContractList = ({ contracts, onEdit, onDelete }) => {
    return (
        <div>
            <h3>Contract List</h3>
            {contracts.length === 0 ? <p>No contracts available.</p> : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Contract Name</th>
                            <th>Client</th>
                            <th>Start Date</th>
                            <th>Duration</th>
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map(contract => (
                            <ContractDetail key={contract.id} contract={contract} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ContractList;
