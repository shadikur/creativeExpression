import React from 'react';

import { FaUsers, FaBookReader, FaRegCalendar, FaRegMoneyBillAlt, FaChalkboardTeacher } from "react-icons/fa";

const Stats = () => {
    return (
        <>
            <section className="p-5 mr-3 dark:bg-gray-800 dark:text-gray-100 bg-white rounded-2xl shadow-xl">
                <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaUsers className="h-9 w-9 dark:text-gray-800" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none">{0}</p>
                            <p className="capitalize">Students</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaChalkboardTeacher className="h-9 w-9 dark:text-gray-800" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none">{0}</p>
                            <p className="capitalize">Instructors</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaBookReader className="h-9 w-9 dark:text-gray-800" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none">{0}</p>
                            <p className="capitalize">Courses</p>
                        </div>
                    </div>
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-400">
                            <FaRegMoneyBillAlt className="h-9 w-9 dark:text-gray-800" />
                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none">{0}</p>
                            <p className="capitalize">Revenue</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Stats;