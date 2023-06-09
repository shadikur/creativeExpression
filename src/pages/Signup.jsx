import React from 'react';

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
import { useForm } from "react-hook-form";
import SocialLogins from '../components/SocialLogins/SocialLogins';
import Banner from '../components/Banner/Banner';

const Signup = () => {
    const { register, handleSubmit } = useForm();

    const links = [
        {
            "label": "Sign Up",
            "url": "/signup"
        },
    ];


    const handleRegisterUser = (data) => {
        console.log(data);
    };

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
                    </div>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(handleRegisterUser)}>
                        <div className="mb-4 flex flex-col gap-6">
                            <fieldset className="flex flex-col md:flex-row gap-1">
                                <Input type='text' size="lg" label="Full name" {...register("name")} />
                                <Input type='email' size="lg" label="Email" {...register("email")} />
                            </fieldset>
                            <fieldset className="flex flex-col md:flex-row gap-1">
                                <Input type="password" size="lg" label="Password" {...register("password")} />
                                <Input type="password" size="lg" label="Confirm Password" {...register("confirmPassword")} />
                            </fieldset>
                            <fieldset className="flex flex-col md:flex-row gap-1">
                                <Input type="text" size="lg" label="Photo URL" {...register("photourl")} />
                                <Select label="Select Gender" {...register("gender")}>
                                    <Option>Male</Option>
                                    <Option>Female</Option>
                                </Select>
                            </fieldset>
                            <fieldset className="flex flex-col md:flex-row gap-1">
                                <Input type="number" size="lg" label="Phone No" {...register("phone")} />
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
                            {...register("terms")}
                        />
                        <Button className="mt-6" fullWidth>
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