import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        // request interceptor to add authorization header for every secure call to the api
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("taka-token");
            // block if there is no token
            if (!token) {
                console.warn("Missing Access Token! Redirecting to Login Page...");
                navigate("/login");
                return Promise.reject(new Error("Missing Access Token!"));
            }
            // proceed if token is found
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
        );

        // response interceptor for handling 401 and 403 status
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response, async (error) => {
                const status = error.response ? error.response.status : null;

                if (status === 401 || status === 403) {
                    console.error("Unauthorized or Forbidden Access: ", status);
                    await logOut();
                    navigate("/login");
                    return Promise.reject(new Error("Unauthorized or Forbidden Access!"));
                }

                console.error("API Request Error: ", error);
                return Promise.reject(error);
            }
        );

        // cleanup function
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
