import { Input, Select, Option, Button, Typography, Textarea } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CoreContext } from '../../AppContext/AppContext';
import useAxios from '../../hooks/useAxios';
import userMiniSwal from '../../hooks/userMiniSwal';
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';


const AddCourse = () => {

    const { register, handleSubmit, getValues, formState: { errors }, control, reset } = useForm();
    const { user, uploadImage, photo, setPhoto } = useContext(CoreContext);
    const axios = useAxios();

    // Get all categories
    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data } = await axios.get('/categories');
            return data;
        }
    });
    console.log(categories);

    // Add course
    const onSubmit = async (data) => {
        const postableData = {
            classname: data.classname,
            instructor: data.instructor,
            category: data.category,
            costs: data.costs,
            seats: data.seats,
            enrolled: 0,
            description: data.description,
            photourl: photo,
            status: 'pending',
        }
        console.log(postableData);
        try {
            const { data: course } = await axios.post('/classes', postableData).then(res => res.data);
            userMiniSwal('success', 'Course added successfully!');
            reset();
            setPhoto('');
        } catch (error) {
            console.error('Error adding course:', error);
            userMiniSwal('error', 'Something went wrong!');
        }
    };

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (isError) {
        return <p>Error fetching categories</p>;
    }




    return (
        <>
            <section className="p-8 pb-10 dark:bg-gray-800 dark:text-gray-50 mt-4 bg-white rounded-2xl shadow-xl">
                {
                    (Object.keys(errors).length > 0) && (
                        <div className="flex w-full flex-col gap-2">
                            <Alert
                                variant="gradient"
                                color="red"
                                icon={
                                    <InformationCircleIcon
                                        strokeWidth={2}
                                        className="h-6 w-6"
                                    />
                                }
                            >
                                <Typography className="font-medium">Ensure that these requirements are met:</Typography>
                                <ul className="mt-2 ml-2 list-disc list-inside">
                                    {errors.classname && <li>{errors.classname.message}</li>}
                                    {errors.costs && <li>{errors.costs.message}</li>}
                                    {errors.seats && <li>{errors.seats.message}</li>}
                                    {errors.photourl && <li>{errors.photourl.message}</li>}
                                </ul>
                            </Alert>
                        </div>
                    )
                }
                <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Class Information</p>
                            <p className="text-xs">Please fillup the calss information that you would like to offer</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Class name"
                                    {...register("classname", {
                                        required: 'Class name is required',
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
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Instructor name"
                                    value={user?.displayName}
                                    {...register("instructor", {
                                        required: 'Instructor name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: 'Invalid name format'
                                        },
                                        minLength: {
                                            value: 3,
                                            message: 'Name must be at least 3 characters'
                                        }
                                    })}
                                    readOnly
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input type='text' size="lg" label="Email" value={user?.email} {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'Invalid email format'
                                    }
                                })}
                                    readOnly
                                />

                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Controller
                                    control={control}
                                    name="category"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select label="Select Category" {...field}>
                                            {
                                                categories?.map((category, index) => (
                                                    <Option key={index} value={category.name}>{category.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Price & Seat</p>
                            <p className="text-xs">Please set a price for the students and the number of accomodation</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input type="text" size="lg" label="Enrolment Cost" {...register("costs", { required: 'Cost information is mandatory' })} />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <Input type="text" size="lg" label="Seats available" {...register("seats", { required: 'Seats information is mandatory' })} />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Textarea type="text" size="lg" label="Class description" {...register("description", { required: 'Description is mandatory' })} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Profile</p>
                            <p className="text-xs">Set users profile photo (PhotoURL or Upload)</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Photo URL"
                                    {...register("photourl", { required: 'Photo is required' })}
                                    value={photo}

                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Button variant="gradient" className="flex items-center gap-3" onClick={uploadImage}>
                                    <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload Photo
                                </Button>
                            </div>
                        </div>
                    </fieldset>
                    <Button color="blue" ripple={true} type="submit">Add Class</Button>
                </form>
            </section>
        </>
    );
};

export default AddCourse;