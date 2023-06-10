import { Spinner, Typography } from '@material-tailwind/react';
import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='w-6 mx-auto p-10 flex flex-col justify-center items-center'>
            <Spinner color="blue" />
            <Typography color="blue">Loading...</Typography>
        </div>
    );
};

export default LoadingSpinner;