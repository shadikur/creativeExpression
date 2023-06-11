import React from 'react';
import useAxios from './../../hooks/useAxios';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import { PencilIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const ViewAllUsers = () => {
    const axios = useAxios();
    const queryClient = new QueryClient();
    const { data: users, isLoading, isError, refetch } = useQuery(
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

    const updateUserRole = async ({ userId, role }) => {
        try {
            await axios.put(`/updaterole/${userId}`, { role });
            refetch();
        } catch (error) {
            console.error('Error updating user role:', error);
            throw error;
        }
    };

    const mutation = useMutation(updateUserRole, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });

    const handleRole = async (userId, role) => {
        mutation.mutate({ userId, role });
    };

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return <div>Error fetching users</div>;
    }


    const TABLE_HEAD = ["Member", "Email", "Role", "Registered", "Actions"];

    return (
        <Card className="w-full mt-5">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Users list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all users in our system
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Link to="/dashboard/addusers">
                            <Button className="flex items-center gap-3" color="blue" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add user
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-hidden px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ _id, photourl, name, email, role, registered }, index) => {
                            const isLast = index === users.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={photourl} alt={name} size="sm" />
                                            <div className="flex flex-col">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
                                                    {name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {email}
                                            </Typography>

                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            {role}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {registered}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className='w-[50%] mx-auto'>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text" color="blue-gray">
                                                    <PencilIcon className="h-4 w-4" color='green' />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Delete User">
                                                <IconButton variant="text" color="blue-gray">
                                                    <XMarkIcon className="h-4 w-4" color='red' size="sm" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <div className='space-x-1'>
                                            {
                                                (role !== 'Student') & (email !== import.meta.env.VITE_ADMIN_EMAIL) ? <Button color="blue" size='sm' onClick={() => handleRole(_id, 'Student')}>Set Student</Button> : <Button color="blue" size='sm' disabled>Set Student</Button>
                                            }

                                            {
                                                (role !== 'Instructor') & (email !== import.meta.env.VITE_ADMIN_EMAIL) ? <Button color="green" size='sm' onClick={() => handleRole(_id, 'Instructor')}>Set Instructor</Button> : <Button color="green" size='sm' disabled>Set Instructor</Button>
                                            }
                                            {
                                                (role !== 'Admin') & (email !== import.meta.env.VITE_ADMIN_EMAIL) ? <Button color="red" size='sm' onClick={() => handleRole(_id, 'Admin')}>Set Admin</Button> : <Button color="red" size='sm' disabled>Set Admin</Button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
};

export default ViewAllUsers;
