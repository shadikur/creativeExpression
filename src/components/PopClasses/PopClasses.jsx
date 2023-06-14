import React from 'react';
import { Typography } from '@material-tailwind/react';
import useAxios from './../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import ClassCard from './ClassCard';

const PopClasses = () => {
    const axios = useAxios();
    const { data: classes, isLoading, error } = useQuery({
        queryKey: ["topclasses"],
        queryFn: async () => {
            const { data } = await axios.get("/popularclasses");
            return data;
        }
    });

    console.log(classes);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    if (error) {
        return <p className="text-red-500">{error.message}</p>;
    }


    return (
        <div>
            <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 mt-5 mb-5 rounded-2xl">
                <Typography variant="h2" color="gray" className="text-center mb-10">
                    Popular Classes
                </Typography>
                <div className="grid grid-cols-1 gap-10 px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:grid-cols-3">
                    {
                        classes.map((classItem) => (
                            <ClassCard key={classItem._id} classItem={classItem}></ClassCard>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default PopClasses;