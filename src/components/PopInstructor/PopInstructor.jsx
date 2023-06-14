import { Typography } from '@material-tailwind/react';
import React from 'react';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import InstructorCard from './InstructorCard';

const PopInstructor = () => {
    const axios = useAxios();
    const { data: instructors, isLoading, error } = useQuery({
        queryKey: ["topinstructors"],
        queryFn: async () => {
            const { data } = await axios.get("/popularinstructors");
            return data;
        }
    });

    console.log(instructors);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (error) {
        return <p className="text-red-500">{error.message}</p>;
    }

    return (
        <div>
            <section className="py-6 bg-blue-100 dark:bg-gray-800 dark:text-gray-100 rounded-2xl">
                <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
                    <Typography size="sm">
                        Top brains behind the operation
                    </Typography>
                    <Typography variant="h3">
                        Most Popular Instructors
                    </Typography>
                    <div className="flex flex-row flex-wrap-reverse justify-center mt-8">
                        {
                            instructors.map((instructor) => <InstructorCard key={instructor._id} instructor={instructor}></InstructorCard>)
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PopInstructor;