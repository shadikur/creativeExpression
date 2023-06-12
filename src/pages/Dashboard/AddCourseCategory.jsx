import { Input, Button, Typography, Textarea } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CoreContext } from '../../AppContext/AppContext';
import useAxios from '../../hooks/useAxios';
import userMiniSwal from '../../hooks/userMiniSwal';
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"


const AddCourseCategory = () => {

    const { register, handleSubmit, getValues, formState: { errors }, control, reset } = useForm();
    const { uploadImage, photo, setPhoto } = useContext(CoreContext);
    const axios = useAxios();

    const onSubmit = async (data) => {
        console.log(data);
        await axios.post('/categories', data);
        reset();
        setPhoto('');
        userMiniSwal(
            'success',
            'Category added successfully',
        );

    };


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
                                    {errors.name && <li>{errors.name.message}</li>}
                                    {errors.description && <li>{errors.description.message}</li>}
                                    {errors.image && <li>{errors.image.message}</li>}
                                </ul>
                            </Alert>
                        </div>
                    )
                }
                <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Category Inormation</p>
                            <p className="text-xs">Please fillup category of the classes</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input
                                    type="text"
                                    size="lg"
                                    label="Category name"
                                    {...register("name", {
                                        required: 'Category name is required',
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
                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Description</p>
                            <p className="text-xs">Please write a brief description which whill be displyed to your website</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Textarea
                                    type="text"
                                    size="lg"
                                    label="Description"
                                    {...register("description", {
                                        required: 'description is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Description text must be at least 10 characters'
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: 'Description text must not exceed 1000 characters'
                                        }
                                    })}
                                />
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
                                    defaultValue={""}
                                    {...register("image", { required: 'Photo URL is required' })}
                                    value={photo}
                                    onChange={(e) => setPhoto(e.target.value)}
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Button variant="gradient" className="flex items-center gap-3" onClick={uploadImage}>
                                    <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload Photo
                                </Button>
                            </div>
                        </div>
                    </fieldset>
                    <Button color="blue" ripple={true} type="submit">Add Category</Button>
                </form>
            </section>
        </>
    );
};

export default AddCourseCategory;