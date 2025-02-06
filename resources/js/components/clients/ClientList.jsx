import React from "react";
import ClientDetail from "./ClientDetail";

const ClientList = ({ clients, onEdit, onDelete }) => {
    return (
        <div>
            <h3>Client List</h3>
            {clients.length === 0 ? <p>No clients available.</p> : (
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
                        {clients.map(client => (
                            <ClientDetail key={client.id} client={client} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClientList;
