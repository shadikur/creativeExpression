import React, { useContext } from 'react';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import SocialLogins from '../components/SocialLogins/SocialLogins';
import Banner from '../components/Banner/Banner';
import { CoreContext } from '../AppContext/AppContext';
import userMiniSwal from '../hooks/userMiniSwal';
import useAxios from './../hooks/useAxios';

const Signup = () => {
    const { register, handleSubmit, getValues, formState: { errors }, control, reset } = useForm();
    const { registerUser, parseCode } = useContext(CoreContext);
    const axios = useAxios();

    const onSubmit = (data) => {
        //Logic to register user and send data to backend using axios
        registerUser(data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                userMiniSwal('success', 'User registered successfully');
                // send data to backend
                axios.post('/users', {
                    name: data.name,
                    email: data.email,
                    role: 'Student',
                    photourl: data.photourl,
                    gender: data.gender,
                    phone: data.phone,
                    address: data.address,
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                reset();
                // ...
            }
            )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                userMiniSwal('error', parseCode(errorCode));
                // ..
            }
            );
    };

    // BreadCrumb Links
    const links = [
        {
            "label": "Sign Up",
            "url": "/signup"
        },
    ];

    return (
        <>
            <Banner links={links}></Banner>
            <div className='mx-auto max-w-md m-20'>
                <Card color="transparent" shadow={false} className='flex flex-col items-center dark:text-white'>
                    <div className='flex flex-col items-center'>
                        <Typography variant="h4" >
                            Sign Up
                        </Typography>
                        <Typography className="mt-1 font-normal">
                            Enter your details to register.
                        </Typography>
                        <hr />
                        {errors.name && <span className="text-red-600">* {errors.name.message}</span>}
                        {errors.email && <span className="text-red-600">* {errors.email.message} </span>}
                        {errors.password && <span className="text-red-600">* {errors.password.message}</span>}
                        {errors.confirmPassword && <span className="text-red-600">* {errors.confirmPassword.message}</span>}
                        {errors.terms && <span className="text-red-600">* {errors.terms.message}</span>}

                    </div>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 flex flex-col gap-6">
                            <fieldset className="flex flex-col md:flex-row gap-1">
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

                                <Input type='text' size="lg" label="Email" {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'Invalid email format'
                                    }
                                })} />
                            </fieldset>
                            <fieldset className="flex flex-col md:flex-row gap-1">
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

                                <Input type="password" size="lg" label="Confirm Password" {...register("confirmPassword", {
                                    required: "Please confirm password!",
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || "Passwords should match!";
                                        }
                                    }
                                })} />
                            </fieldset>
                            <fieldset className="flex flex-col md:flex-row gap-1">
                                <Input type="text" size="lg" label="Photo URL" {...register("photourl")} defaultValue={`https://res.cloudinary.com/ddez9nchs/image/upload/v1686293428/CreativeExpressions/placeholder-image-person-jpg.jpg`} />
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
                            </fieldset>
                            <fieldset className="flex flex-col md:flex-row gap-1">
                                <Input type="text" size="lg" label="Phone No" {...register("phone")} />
                                <Input type="text" size="lg" label="Address" {...register("address")} />
                            </fieldset>
                        </div>
                        <Checkbox
                            label={
                                (
                                    <Typography
                                        variant="small"

                                        className="flex items-center font-normal dark:text-white"
                                    >
                                        I agree the
                                        <Link
                                            to={`/terms`}
                                            className="font-medium transition-colors hover:text-blue-500"
                                        >
                                            &nbsp;Terms and Conditions
                                        </Link>
                                    </Typography>
                                )
                            }
                            containerProps={{ className: "-ml-2.5" }}
                            {...register("terms", { required: "Please accept terms and conditions" })}
                        />
                        <Button type='submit' className="mt-6" fullWidth>
                            Sign Up
                        </Button>

                        <Typography className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link
                                to={`/signin`}
                                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                            >
                                Sign In
                            </Link>
                        </Typography>
                        <div className="flex items-center pt-4 space-x-1 mt-4">
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                            <p className="px-3 text-sm dark:text-gray-400">Signup with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                        </div>
                        <SocialLogins></SocialLogins>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default Signup;