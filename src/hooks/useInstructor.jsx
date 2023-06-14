import React, { useContext } from 'react';
import { CoreContext } from '../AppContext/AppContext';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const UseInstructor = () => {
    const { user, loading } = useContext(CoreContext);
    const axios = useAxios();

    const { data: isInstructor, isLoading, error } = useQuery({
        queryKey: ['isInstructor'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axios.get(`/users/${user?.email}`);
            return data[0]?.role === 'Instructor' ? true : false;
        }
    });
    return [isInstructor, isLoading, error];
};

export default UseInstructor;