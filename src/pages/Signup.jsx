import React, { useContext } from 'react';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
    Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { Controller, set, useForm } from "react-hook-form";
import SocialLogins from '../components/SocialLogins/SocialLogins';
import Banner from '../components/Banner/Banner';
import { CoreContext } from '../AppContext/AppContext';
import userMiniSwal from '../hooks/userMiniSwal';
import useAxios from './../hooks/useAxios';
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { BsCloudUpload } from "react-icons/bs";

const Signup = () => {
    const { register, handleSubmit, getValues, formState: { errors }, control, reset } = useForm();
    const { registerUser, parseCode, updateUserProfile, uploadImage, photo, setPhoto } = useContext(CoreContext);
    const axios = useAxios();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // Logic to register user and send data to backend using axios
        await registerUser(data.email, data.password)
            .then((userCrederegisterationDate) => {
                // Signed in 
                const registerDate = new Date(userCrederegisterationDate.user.metadata.creationTime).toLocaleDateString();
                // Send data to backend
                axios.post('/users', {
                    name: data.name,
                    email: data.email,
                    role: 'Student',
                    photourl: data.photourl,
                    gender: data.gender,
                    phone: data.phone,
                    address: data.address,
                    registered: registerDate
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                updateUserProfile(data.name, data.photourl).then((resp) => {
                    console.log('Profile updated');
                    console.log(resp);
                }).catch((error) => {
                    console.log(error);
                });
                reset();
                userMiniSwal('success', 'User registered successfully');
                setTimeout(() => {
                    userMiniSwal('info', 'We are taking you to the home page');
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
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
                                            {errors.terms && <li>{errors.terms.message}</li>}
                                        </ul>
                                    </Alert>
                                </div>
                            )
                        }

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
                                <Input type="text" size="lg" label="Photo URL or Upload" {...register("photourl")} value={photo}
                                    onChange={(e) => setPhoto(e.target.value)} icon={
                                        <BsCloudUpload onClick={uploadImage} color='blue' title='Click here to upload'></BsCloudUpload>
                                    } />
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
                    </form>
                    <SocialLogins></SocialLogins>
                </Card>
            </div>
        </>
    );
};

export default Signup;