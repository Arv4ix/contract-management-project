import React from "react";

const ContractDetail = ({ contract, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{contract.contract_name}</td>
            <td>{contract.client_name}</td>
            <td>{contract.start_date}</td>
            <td>{contract.duration} months</td>
            <td>{contract.comments}</td>
            <td>
                <button className="btn btn-primary btn-sm" onClick={() => onEdit(contract)}>Edit</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => onDelete(contract.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ContractDetail;
