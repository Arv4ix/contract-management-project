import React from "react";
import ClientDetail from "./ClientDetail";

const ClientList = ({ clients, onEdit, onDelete }) => {
    // Ensure clients is always an array
    const safeClients = Array.isArray(clients) ? clients : [];

    return (
        <div>
            <h3>Client List</h3>
            {safeClients.length === 0 ? <p>No clients available.</p> : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {safeClients.map(client => (
                            <ClientDetail key={client.id} client={client} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClientList;
