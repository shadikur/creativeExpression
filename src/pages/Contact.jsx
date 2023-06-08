import React from 'react';
import useTitle from '../hooks/useTitle';
import Banner from '../components/Banner/Banner';
import { Button, Input, Textarea } from '@material-tailwind/react';

const Contact = () => {
    const links = [
        {
            "label": "Contact",
            "url": "/contact"
        },
    ];
    return (
        <div>
            {
                useTitle('Contact Us', 'We are here to help you!')
            }
            <Banner links={links}></Banner>
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100 m-5">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Lets talk!</h2>
                        <div className="dark:text-gray-400"> We are always ready to help. Please shoot us a message. </div>
                    </div>
                    <img src="https://res.cloudinary.com/ddez9nchs/image/upload/v1686267033/CreativeExpressions/doodle.svg" alt="" className="p-6 h-52 md:h-64" />
                </div>
                <form className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div>
                        <Input id="name" type="text" label="Full Name" />
                    </div>
                    <div>
                        <Input id="email" type="email" label='Email' />
                    </div>
                    <div>
                        <Textarea id="message" rows="3" label='Message'></Textarea>
                    </div>
                    <Button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-violet-400 dark:text-gray-900">Send Message</Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;