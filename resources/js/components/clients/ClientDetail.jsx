import React from "react";

const ClientDetail = ({ client, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-primary btn-sm" onClick={() => onEdit(client)}>Edit</button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => onDelete(client.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ClientDetail;
