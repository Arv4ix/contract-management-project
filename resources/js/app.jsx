import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; // Import the main App component

// Find the root element and render the app
const rootElement = document.getElementById("app");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
