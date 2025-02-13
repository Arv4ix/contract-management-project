import React from "react";

const ContractDetail = ({ contract, onEdit, onDelete }) => {
    if (!contract) {
        return null;
    }
    
    return (
        <tr>
            <td style={{ minWidth: "150px"}}>{contract.contractName || contract.contract_name}</td>
            <td style={{ minWidth: "150px"}}>{contract.clientName || contract.client?.name}</td>
            <td style={{ minWidth: "120px"}}>{contract.startDate || contract.start_date}</td>
            <td style={{ minWidth: "100px"}}>{contract.duration} months</td>
            <td style={{ minWidth: "200px"}}>{contract.comments}</td>
            <td>
                <button className="btn btn-primary btn-sm" onClick={() => onEdit(contract.id)}>Edit</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => onDelete(contract.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ContractDetail;
