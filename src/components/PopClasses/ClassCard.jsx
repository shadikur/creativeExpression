import { Card, Typography } from '@material-tailwind/react';
import React from 'react';

const ClassCard = ({ classItem }) => {

    return (
        <Card>

            <div className="flex flex-col justify-between overflow-hidden transition-shadow duration-300 bg-white rounded-xl shadow-sm">
                <img
                    className="object-cover w-full h-56"
                    src={classItem.photourl}
                    alt={classItem.classname}
                />
                <div className="flex flex-col justify-between flex-1 p-6">
                    <div className="flex-1">
                        <Typography variant="h5" color="gray" className="mb-2">
                            {classItem.classname}
                        </Typography>
                        <Typography variant="body2" color="gray">
                            {classItem.description.slice(0, 100)}...
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <Typography variant="body2" color="gray">
                            10:00 AM - 12:00 PM
                        </Typography>
                        <Typography variant="body2" color="gray">
                            {classItem.seats} Seats
                        </Typography>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ClassCard;