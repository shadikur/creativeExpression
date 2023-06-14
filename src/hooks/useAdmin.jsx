import React, { useContext } from 'react';
import { CoreContext } from '../AppContext/AppContext';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user, loading } = useContext(CoreContext);
    const axios = useAxios();

    const { data: isAdmin, isLoading, error } = useQuery({
        queryKey: ['isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axios.get(`/users/${user?.email}`);
            return data[0]?.role === 'Admin' ? true : false;
        }
    });
    return [isAdmin, isLoading, error];
};

export default useAdmin;