import React from 'react';
import Sidebar from '../pages/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Stats from '../components/Stats/Stats';

const DashboardLayout = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 bg-gray-200 dark:bg-gray-800 dark:text-white h-[100vh]'>
            <div className=' p-5'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-span-4 p-4'>
                <Stats></Stats>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashboardLayout;