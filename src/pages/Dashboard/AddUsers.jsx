import { Input, Select, Option, Button } from '@material-tailwind/react';
import React from 'react';

const AddUsers = () => {
    return (
        <>
            <section className="p-8 pb-10 dark:bg-gray-800 dark:text-gray-50 mt-4 bg-white rounded-2xl shadow-xl">
                <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid" onSubmit={``}>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Personal Inormation</p>
                            <p className="text-xs">Please fillup users personal information here</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input id="fullname" type="text" label='Full name' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input id="email" type="email" label='Email' />
                            </div>

                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Security information</p>
                            <p className="text-xs">Please set an email and password for the user</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input id="firstname" type="text" label='Password' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input id="lastname" type="text" label='Confirm Password' />
                            </div>
                            <div className="col-span-full sm:col-span-3">

                                <Select label="Select user role">
                                    <Option>Student</Option>
                                    <Option>Instructor</Option>
                                    <Option>Administrator</Option>
                                </Select>
                            </div>

                        </div>
                    </fieldset>
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Profile</p>
                            <p className="text-xs">Set users profile photo (PhotoURL or Upload)</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <Input id="website" type="text" label='Photo Url' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Input id="website" type="file" label='Upload Photo' />
                            </div>
                        </div>
                    </fieldset>
                    <Button color="blue" ripple="light" type="submit">Add User</Button>
                </form>
            </section>
        </>
    );
};

export default AddUsers;