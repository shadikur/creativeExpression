import React from 'react';
import { Typography } from "@material-tailwind/react";
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const LINKS = [
        {
            title: "Product",
            items: ["Overview", "Features", "Solutions", "Tutorials"],
        },
        {
            title: "Company",
            items: ["About us", "Careers", "Press", "News"],
        },
        {
            title: "Resource",
            items: ["Blog", "Newsletter", "Events", "Help center"],
        },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full rounded-t-3xl dark:bg-[#292929]">
            <div className="mx-auto w-full max-w-7xl px-8">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                    <div className='mt-7'>
                        <Logo></Logo>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-4">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="mb-3 font-medium opacity-40 dark:text-white mt-4"
                                >
                                    {title}
                                </Typography>
                                {items.map((link) => (
                                    <li key={link}>
                                        <Typography
                                            as="a"
                                            href="#"
                                            color="gray"
                                            className="py-1.5 font-normal transition-colors hover:text-blue-gray-900 dark:text-white"
                                        >
                                            {link}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 dark:text-white md:mb-0"
                    >
                        &copy; {currentYear} <Link to={`/`}>Creative Expressions</Link>. All
                        Rights Reserved.
                    </Typography>
                    <div className="flex gap-4 text-blue-gray-900 dark:text-white sm:justify-center">
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
                            <FaFacebook></FaFacebook>
                        </Typography>
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
                            <FaInstagram></FaInstagram>
                        </Typography>
                        <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
                            <FaTwitter></FaTwitter>
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;