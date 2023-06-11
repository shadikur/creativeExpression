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
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewCourseCategory = () => {
    const axios = useAxios();
    const queryClient = new QueryClient();
    const { data: categories, isLoading, isError, refetch } = useQuery(
        {
            queryKey: ['categories'],
            queryFn: async () => {
                const { data } = await axios.get('/categories');
                return data;
            }
        },
        {
            onError: (error) => {
                console.error('Error fetching categories:', error);
            },
        }
    );

    const handleUpdate = async (_id) => {
        console.log(_id);
    }


    const handleDelete = async (_id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`/categories/${_id}`);
                    refetch();
                } catch (error) {
                    console.error('Error deleting category:', error);
                    throw error;
                }
                Swal.fire(
                    'Deleted!',
                    'Your category has been deleted.',
                    'success'
                )
            }
        })
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error fetching categories</div>;
    }

    if (!categories) {
        return null; // Or show a loading state
    }


    const TABLE_HEAD = ["Category Title", "Descripton", "Image", "Update", "Delete"];

    return (
        <Card className="w-full mt-5" >
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            List of Categories
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            All of our categories are listed here. As an admin, you can add, edit, delete categories.
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Link to="/dashboard/addcoursecategory">
                            <Button className="flex items-center gap-3" color="blue" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Categories
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
                        {categories.map(({ _id, name, description, image }, index) => {
                            const isLast = index === categories.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
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
                                                {description}
                                            </Typography>

                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <img className="w-20 h-20" src={image} alt={name} />
                                            <code className="text-xs">{image}</code>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            <Button color="blue" size='sm' onClick={() => handleUpdate(_id)}>Update</Button>
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className='w-[50%] mx-auto'>
                                            <Button color="blue" size='sm' onClick={() => handleDelete(_id)}>Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </Card >
    );
};

export default ViewCourseCategory;
