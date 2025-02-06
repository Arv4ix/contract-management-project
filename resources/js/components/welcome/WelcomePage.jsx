import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Welcome to Contract Management</h1>
            <p className="lead">
                A simple and efficient way to manage clients and their contracts.
            </p>
            <p>
                Navigate through the system to add, edit, and view your clients and contracts.
            </p>
            <div className="mt-4">
                <Link to="/clients" className="btn btn-primary me-2">Manage Clients</Link>
                <Link to="/contracts" className="btn btn-secondary me-2">Manage Contracts</Link>
                <Link to="/contract-list" className="btn btn-success">View All Contracts</Link>
            </div>
        </div>
    );
};

export default WelcomePage;
