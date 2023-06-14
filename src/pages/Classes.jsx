import React from 'react';
import useTitle from '../hooks/useTitle';
import { Typography } from '@material-tailwind/react';
import Banner from '../components/Banner/Banner';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import ClassCard from '../components/Classes/ClassCard';

const Classes = () => {

    const axios = useAxios();
    const title = useTitle('Classes', 'All of course listed here');
    const { data: classes, isLoading, error } = useQuery({
        queryKey: 'classes',
        queryFn: async () => {
            const { data } = await axios.get('/approvedclasses');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Something went wrong...</p>;

    const links = [
        {
            "label": "Classes",
            "url": "/classes"
        },
    ];

    return (
        <div>
            {title}
            <Banner links={links}></Banner>
            <div className="flex flex-col items-center w-full  mt-5 mb-5">
                <div>
                    <Typography variant="h1" color="gray">Classes</Typography>
                    <Typography color="gray">All of course listed here</Typography>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 mb-3'>
                    {
                        classes.map((course) => (
                            <div key={course.id}>
                                <ClassCard course={course}></ClassCard>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default Classes;