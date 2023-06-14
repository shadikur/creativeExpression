import React, { useContext } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';
import { CoreContext } from '../../AppContext/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ClassCard = ({ course }) => {

    const { user } = useContext(CoreContext);
    const navigate = useNavigate();
    const location = useLocation();



    const handleSelectCourse = (id) => {

        if (!user) {
            Swal.fire({
                title: 'Do you want to proceed?',
                text: "You need to login to select the class",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, login!'
            }).then((result) => {

                if (result.isConfirmed) {
                    Swal.fire(
                        'Login!',
                        'You need to login to select the class. We will redirect you to the login page',
                        'success'
                    );
                    setTimeout(() => {
                        navigate('/signin', { state: { from: location.pathname } });

                    }, 2000);
                }

            });
        } else {
            Swal.fire({
                title: 'Do you want to proceed?',
                text: "You are applying in the class",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',

                confirmButtonText: 'Yes, select it!'
            }).then(async (result) => {

                if (result.isConfirmed) {
                    Swal.fire(
                        'Course Selected!',
                        'Please pay the course fee to complete the enrollment. We will redirect you to the payment page',
                        'success'
                    );
                    setTimeout(() => {
                        navigate('/dashboard/myclasses', { state: { from: location.pathname } });

                    }, 2000);
                }

            });
        }

    };

    return (
        <div>
            <Card className={`${course.seats - course.enrolled > 0 ? '' : 'bg-red-500'} flex-row w-full max-w-[55rem]`}>
                <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                    <img
                        src={course.photourl}
                        alt="image"
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
                <CardBody >
                    <Typography variant="h6" color="blue" className="uppercase mb-4">{course.category}</Typography>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {course.classname}
                    </Typography>
                    <Typography color="gray" className="font-normal mb-8">
                        {course.description}
                    </Typography>
                    <Typography color="gray" className="font-normal mb-8 bg-blue-gray-400 text-white p-5 rounded-xl">
                        <p>
                            {"Instructed by : " + course.instructor}
                        </p>
                        <p>
                            {"Available Seats: " + (course.seats - course.enrolled)}
                        </p>
                        <p>
                            {"Price: $" + (course.costs)}
                        </p>
                    </Typography>
                    <a href="#" className="inline-block">
                        <Button variant="text" onClick={() => handleSelectCourse(course._id)} className="flex items-center gap-2 bg-blue-400 hover:bg-blue-600 text-white">
                            Select this class
                            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                        </Button>
                    </a>
                </CardBody>
            </Card>
        </div >
    );
};

export default ClassCard;