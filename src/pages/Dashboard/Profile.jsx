import React, { useContext } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { CoreContext } from '../../AppContext/AppContext';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';

const Profile = () => {

    const { user } = useContext(CoreContext);
    const axios = useAxios();

    // Get details from backend using user email usequery

    const { data: userProfile, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axios.get(`/users/${user.email}`);
            return data[0];
        }
    });

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    if (error) return <p>Error!</p>;

    console.log(userProfile);

    return (
        <Card className="w-1/2 mx-auto mt-5">
            <CardHeader floated={false} className="h-80">
                <img src={userProfile?.photourl} alt={userProfile?.name} />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {userProfile?.name}
                </Typography>
                <Typography color="blue" className="font-medium" textGradient>
                    {userProfile?.role}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#twitter"
                        variant="lead"
                        color="light-blue"
                        textGradient
                    >
                        <i className="fab fa-twitter" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
};

export default Profile;