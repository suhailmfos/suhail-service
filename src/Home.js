import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://suhail.up.railway.app";

const Home = ({ setIsAuthenticated }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL + "/api/v1/current-user", { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(() => {
                setIsAuthenticated(false);
                navigate("/login");
            });
    }, [navigate, setIsAuthenticated]);

    const handleLogout = async () => {
        await axios.post(API_URL + "/logout", {}, { withCredentials: true });
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // Example if using token-based auth
        sessionStorage.removeItem("user"); // Example if using session storage

        // Redirect to login page
        navigate("/login");
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
                <p className="text-gray-600 mb-6">You have successfully logged in!</p>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;