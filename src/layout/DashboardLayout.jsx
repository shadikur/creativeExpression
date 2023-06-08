import React from 'react';
import Sidebar from '../pages/Dashboard/Sidebar';
import Dashboard from '../pages/Dashboard/Dashboard';

const DashboardLayout = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 bg-gray-200 h-[100vh]'>
            <div className=' p-4'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-span-3 p-4'>
                <Dashboard></Dashboard>
            </div>

        </div>
    );
};

export default DashboardLayout;