import React from "react";

const ErrorMessage = ({ message }) => {
    return (
        <div className="alert alert-danger text-center mt-4" role="alert">
            {message || "An unexpected error occurred. Please try again."}
        </div>
    );
};

export default ErrorMessage;
