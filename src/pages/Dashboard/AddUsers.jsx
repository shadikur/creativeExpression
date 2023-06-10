import { Input, Select, Option, Button } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CoreContext } from '../../AppContext/AppContext';
import useAxios from '../../hooks/useAxios';
import userMiniSwal from '../../hooks/userMiniSwal';

const AddUsers = () => {

    const { register, handleSubmit, getValues, formState: { errors }, control, reset } = useForm();
    const { registerUser, parseCode } = useContext(CoreContext);
    const axios = useAxios();

    const onSubmit = (data) => {
        //Logic to register user and send data to backend using axios
        console.log(data);
        if (data.image) {
            const formData = new FormData();
            formData.append('file', data.image[0]);
            axios.post('/multer', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    console.log(response);
                    const imageUrl = response.data.imageUrl;
                    console.log(imageUrl);
                }
                )
                .catch((error) => {
                    console.log(error);
                });
        }

        // registerUser(data.email, data.password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         console.log(user);
        //         userMiniSwal('success', 'User added successfully!');
        //         // send data to backend
        //         axios.post('/users', {
        //             name: data.name,
        //             email: data.email,
        //             password: data.password,
        //             confirmPassword: data.confirmPassword,
        //             role: 'student',
        //         })
        //             .then((response) => {
        //                 console.log(response);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });

        //         reset();
        //         // ...
        //     }
        //     )
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, errorMessage);
        //         userMiniSwal('error', parseCode(errorCode));
        //         // ..
        //     }
        //     );
    };

    return (
        <>
            <section className="p-8 pb-10 dark:bg-gray-800 dark:text-gray-50 mt-4 bg-white rounded-2xl shadow-xl">
                {errors.name && <span className="text-red-600">* {errors.name.message}</span>}
                {errors.email && <span className="text-red-600">* {errors.email.message} </span>}
                {errors.password && <span className="text-red-600">* {errors.password.message}</span>}
                {errors.confirmPassword && <span className="text-red-600">* {errors.confirmPassword.message}</span>}
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
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select label="Select user role" {...field} >
                                            <Option>Student</Option>
                                            <Option>Instructor</Option>
                                            <Option>Administrator</Option>
                                        </Select>)}
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
                                <Input type="text" size="lg" label="Photo URL" {...register("photourl")} defaultValue={`https://res.cloudinary.com/ddez9nchs/image/upload/v1686293428/CreativeExpressions/placeholder-image-person-jpg.jpg`} />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input id="website" type="file" label='Upload Photo' {...register("image")} />
                            </div>
                        </div>
                    </fieldset>
                    <Button color="blue" ripple="light" type="submit">Add User</Button>
                </form>
            </section>
        </>
    );
};

export default AddUsers;