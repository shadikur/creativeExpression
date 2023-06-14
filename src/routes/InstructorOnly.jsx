import React, { useContext } from 'react';
import { CoreContext } from '../AppContext/AppContext';
import useAdmin from '../hooks/useAdmin';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import UseInstructor from '../hooks/UseInstructor';

const InstructorOnly = ({ children }) => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(CoreContext);
    const [isInstructor, isLoading, error] = UseInstructor();


    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <p>Something went wrong...</p>;
    }

    if (user && isInstructor) {
        return children;
    }
    else {
        logOut();
        navigate('/signin');
    }
};

export default InstructorOnly;