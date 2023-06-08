import React from 'react';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Banner from '../components/Banner/Banner';
import SocialLogins from '../components/SocialLogins/SocialLogins';
import useTitle from './../hooks/useTitle';

const Signin = () => {
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

                <Card color="transparent" shadow={false} className='flex flex-col items-center'>
                    <div className='flex flex-col items-center'>
                        <Typography variant="h4" color="blue-gray">
                            Sign In
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Enter your details to login.
                        </Typography>
                    </div>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input size="lg" label="Email" />
                            <Input type="password" size="lg" label="Password" />
                        </div>

                        <Button className="mt-6" fullWidth>
                            Sign In
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
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
                        <SocialLogins></SocialLogins>
                    </form>
                </Card>
            </div>
        </>

    );
};

export default Signin;