import React, { useContext } from 'react';
import { CoreContext } from '../AppContext/AppContext';
import useAdmin from '../hooks/useAdmin';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const AdminOnly = ({ children }) => {

    const navigate = useNavigate();
    const { user, logOut } = useContext(CoreContext);
    const [isAdmin, isLoading, error] = useAdmin();

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <p>Something went wrong...</p>;
    }

    if (user && isAdmin) {
        return children;
    }
    else {
        logOut();
        navigate('/signin');
    }
};

export default AdminOnly;