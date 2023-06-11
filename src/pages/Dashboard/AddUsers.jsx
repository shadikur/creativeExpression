import { Input, Select, Option, Button, Typography } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CoreContext } from '../../AppContext/AppContext';
import useAxios from '../../hooks/useAxios';
import userMiniSwal from '../../hooks/userMiniSwal';
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"


const AddUsers = () => {

    const { register, handleSubmit, getValues, formState: { errors }, control, reset } = useForm();
    const { registerUser, parseCode, uploadImage, photo, setPhoto, updateUserProfile } = useContext(CoreContext);
    const axios = useAxios();

    const onSubmit = async (data) => {

        try {

            // register user to firebase
            const response = await registerUser(data.email, data.password);
            const { uid } = response.user;
            updateUserProfile(data.name, data.photourl).then(() => {
                console.log('user profile updated');
            }).catch(err => {
                console.log(err);
            });

            // send data to backend
            await axios.post('/users', {
                name: data.name,
                email: data.email,
                role: data.role,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                photourl: data.photourl,
                registered: new Date().toLocaleDateString(),
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
            userMiniSwal('success', 'User added successfully!');
            reset();
        } catch (error) {
            const errorCode = error.code;
            userMiniSwal('error', parseCode(errorCode));
        }
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
                                    {errors.email && <li>{errors.email.message}</li>}
                                    {errors.password && <li>{errors.password.message}</li>}
                                    {errors.confirmPassword && <li>{errors.confirmPassword.message}</li>}
                                </ul>
                            </Alert>
                        </div>
                    )
                }
                <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Personal Inormation</p>
                            <p className="text-xs">Please fillup users personal information here</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
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
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input type='text' size="lg" label="Email" {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'Invalid email format'
                                    }
                                })} />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Controller
                                    control={control}
                                    name="gender"
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select label="Select Gender" {...field}>
                                            <Option value="male">Male</Option>
                                            <Option value="female">Female</Option>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <Input type="text" size="lg" label="Phone No" {...register("phone")} />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <Input type="text" size="lg" label="Address" {...register("address")} />
                            </div>

                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Security information</p>
                            <p className="text-xs">Please set an email and password for the user</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input
                                    type="password"
                                    size="lg"
                                    label="Password"
                                    {...register("password", {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'Password must not exceed 16 characters'
                                        }
                                    })}
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input type="password" size="lg" label="Confirm Password" {...register("confirmPassword", {
                                    required: "Please confirm password!",
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || "Passwords should match!";
                                        }
                                    }
                                })} />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Controller
                                    control={control}
                                    name="role"
                                    defaultValue="Student"
                                    render={({ field }) => (
                                        <Select label="Select user role" {...field}>
                                            <Option value="Student">Student</Option>
                                            <Option value="Instructor">Instructor</Option>
                                            <Option value="Administrator">Admin</Option>
                                        </Select>
                                    )}
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
                                    {...register("photourl")}
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
                    <Button color="blue" ripple={true} type="submit">Add User</Button>
                </form>
            </section>
        </>
    );
};

export default AddUsers;