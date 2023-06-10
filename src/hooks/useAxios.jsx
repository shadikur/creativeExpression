import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { CoreContext } from '../AppContext/AppContext';

// Create a custom axios instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const useAxios = () => {
    const { logOut } = useContext(CoreContext);

    // Intercept all requests and add the authorization token to the header
    useEffect(() => {
        // Set the authorization header for all requests
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Handle 401, 403 responses and logout the user and redirect to login
        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    localStorage.removeItem('token');
                    await logOut();
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            });

    }, [logOut]);

    return instance;
};

export default useAxios;