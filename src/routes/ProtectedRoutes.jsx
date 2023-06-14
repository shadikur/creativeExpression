import React, { useContext } from 'react';
import { CoreContext } from '../AppContext/AppContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';

const ProtectedRoutes = ({ children }) => {

    const { user, loading } = useContext(CoreContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />
    }

    if (user) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} replace></Navigate>
};

export default ProtectedRoutes;