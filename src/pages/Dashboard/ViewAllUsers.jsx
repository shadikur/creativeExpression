import React from 'react';
import useAxios from './../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';

const ViewAllUsers = () => {
    const axios = useAxios();

    const { data: users, isLoading, isError } = useQuery(
        {
            queryKey: ['users'],
            queryFn: async () => {
                const { data } = await axios.get('/users');
                return data;
            }
        },
        {
            onError: (error) => {
                console.error('Error fetching users:', error);
            },
        }
    );

    console.log(users);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return <div>Error fetching users</div>;
    }

    return (
        <div>
            {users.map((user) => (
                <div key={user._id}>{user._id}</div>
            ))}
        </div>
    );
};

export default ViewAllUsers;
