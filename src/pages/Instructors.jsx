import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import useTitle from '../hooks/useTitle';
import Banner from '../components/Banner/Banner';
import { Typography } from '@material-tailwind/react';
import InstructorCard from '../components/InstructorCard/InstructorCard';

const Instructors = () => {

    const axios = useAxios();
    const title = useTitle('Instructors', 'All of our instructors listed here');
    const { data: instructors, isLoading, error } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const { data } = await axios.get('/instructors');
            return data;
        }
    });

    console.log(instructors);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Something went wrong...</p>;

    const links = [
        {
            "label": "Instructors",
            "url": "/instructors"
        },
    ];


    return (
        <div>
            {title}
            <Banner links={links}></Banner>
            <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 mt-5 mb-5 rounded-2xl">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-end">
                        <div className="flex-1 text-center">
                            <Typography variant="h3" color="gray">Instructors</Typography>
                            <Typography variant="subtitle1" color="gray">All of our instructors listed here</Typography>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                        {instructors.map((instructor) => (
                            <div key={instructor.id}>
                                <InstructorCard instructor={instructor} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Instructors;