import React from 'react';
import { useForm } from 'react-hook-form';
import useAxios from './../../hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from './../../components/Spinner/LoadingSpinner';
import { Button, Input, Label, Typography } from '@material-tailwind/react';
import { Alert } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const AddEvents = () => {

    // const axios = useAxios();
    // const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    // const { mutate, isLoading } = useMutation((data) => axios.post('/events', data));

    // const onSubmit = (data) => {
    //     mutate(data);
    // };

    // if (isLoading) return <LoadingSpinner />;


    return (
        <>
            <h2>TO DO</h2>
            {/* <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-full max-w-md px-4 py-8 bg-white rounded-md shadow-md dark:bg-gray-800">
                    <Typography color="blueGray" className="text-center text-4xl font-bold">
                        Add Event
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            <Label color="blueGray">Event Name</Label>
                            <Input
                                type="text"
                                size="lg"
                                label="Full name"
                                {...register("name", {
                                    required: 'Name is required',
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: 'Invalid name format'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Name must be at least 3 characters'
                                    }
                                })}
                            />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                    </form>
                </div>
            </div> */}
        </>
    );
};

export default AddEvents;