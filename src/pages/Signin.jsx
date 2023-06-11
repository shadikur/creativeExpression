import React, { useContext } from 'react';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner/Banner';
import SocialLogins from '../components/SocialLogins/SocialLogins';
import useTitle from './../hooks/useTitle';
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { CoreContext } from '../AppContext/AppContext';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';

const Signin = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser, parseCode } = useContext(CoreContext);
    const axios = useAxios();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            console.log(data);
            const response = await loginUser(data.email, data.password);
            const { user } = response;
            if (user) {
                const { email } = user;
                const { data: { token } } = await axios.post('/auth', { email });
                localStorage.setItem('token', token);
                await parseCode(token);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };


    const links = [
        {
            "label": "Sign In",
            "url": "/signin"
        },
    ];
    return (
        <>
            {
                useTitle('Sign In', ' Unlesh your creativity')
            }
            <Banner links={links}></Banner>
            <div className='max-w-md mx-auto m-20'>

                <Card color="transparent" shadow={false} className='flex flex-col items-center dark:text-white'>
                    <div className='flex flex-col items-center'>
                        <Typography variant="h4" className="">
                            Sign In
                        </Typography>
                        <Typography className="mt-1 font-normal">
                            Enter your details to login.
                        </Typography>
                    </div>
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
                                        {errors.email && <li>{errors.email.message}</li>}
                                        {errors.password && <li>{errors.password.message}</li>}
                                    </ul>
                                </Alert>
                            </div>
                        )
                    }
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 flex flex-col gap-6">
                            <Input type='text' size="lg" label="Email" {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Invalid email format'
                                }
                            })} />

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

                        <Button type='submit' className="mt-6" fullWidth>
                            Sign In
                        </Button>
                        <Typography className="mt-4 text-center font-normal">
                            New here?{" "}
                            <Link
                                to={`/signup`}
                                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                            >
                                Sign Up
                            </Link>
                        </Typography>
                        <div className="flex items-center pt-4 space-x-1 mt-4">
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                            <p className="px-3 text-sm dark:text-gray-400">Signin with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                        </div>
                    </form>
                    <SocialLogins></SocialLogins>
                </Card>
            </div>
        </>

    );
};

export default Signin;