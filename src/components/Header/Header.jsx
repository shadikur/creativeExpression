import React, { useContext, useEffect, useState } from 'react';
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import { MdDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import Logo from '../Logo/Logo';
import { CoreContext } from '../../AppContext/AppContext';
import { Link, NavLink } from 'react-router-dom';
import userMiniSwal from '../../hooks/userMiniSwal';

const Header = () => {
    const { user, logOut } = useContext(CoreContext);
    const [openNav, setOpenNav] = useState(false);
    const handleLogOut = async () => {
        await logOut().then(() => {
            userMiniSwal('success', 'Logged out successfully');
            setTimeout(() => {
                window.location.href = '/';
            }
                , 1000);

        });
    };


    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const { theme, setTheme } = useContext(CoreContext);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to={`/`} className="flex items-center dark:text-white">
                    Home
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to={`/classes`} className="flex items-center dark:text-white">
                    Classes
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={`/instructors`} className="flex items-center dark:text-white">
                    Instructors
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={`/contact`} className="flex items-center dark:text-white">
                    Contact
                </Link>
            </Typography>
        </ul>
    );

    return (
        <>
            <Navbar className="sticky inset-0 z-10 h-max max-w-full py-2 px-4 lg:px-8 lg:py-4 bg-white dark:bg-[#292929] pt-2 mb-2 rounded-xl shadow-2xl border-none">
                <div className="flex items-center justify-between text-blue-gray-900 dark:text-white">
                    <Logo></Logo>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <Menu
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 25 },
                            }}
                        >
                            {
                                user ? ( // If the user is logged in, show the user menu
                                    <>
                                        <MenuHandler>
                                            <Button>
                                                <Avatar src={user.photoURL ? user.photoURL : 'https://res.cloudinary.com/ddez9nchs/image/upload/v1686293428/CreativeExpressions/placeholder-image-person-jpg.jpg'} alt="avatar" size='xs' className='mr-2' />
                                                {user.displayName ? user.displayName.split(" ")[0] : 'UNKNOWN'}
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            <Link to={`/dashboard`}>
                                                <MenuItem>
                                                    Dashboard
                                                </MenuItem>
                                            </Link>
                                            <MenuItem
                                                onClick={() => {
                                                    handleLogOut();
                                                }}>
                                                Log Out
                                            </MenuItem>
                                        </MenuList>
                                    </>
                                ) : ( // If the user is not logged in, show the login menu

                                    <>
                                        <MenuHandler>
                                            <Button>Membership</Button>
                                        </MenuHandler>
                                        <MenuList>
                                            <Link to={`/signin`}>
                                                <MenuItem>
                                                    Sign In
                                                </MenuItem>
                                            </Link>
                                            <Link to={`/signup`}>
                                                <MenuItem>
                                                    Sign Up
                                                </MenuItem>
                                            </Link>
                                        </MenuList>
                                    </>
                                )
                            }

                        </Menu>
                        {/* Add a theme switcher */}
                        <button
                            id="theme-toggle"
                            type="button"
                            onClick={toggleTheme}
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                        >
                            {
                                theme === 'light' ? (
                                    <MdDarkMode className="w-5 h-5" color='black' />
                                ) : (
                                    <BsSun className="w-5 h-5" color='white' />
                                )
                            }
                        </button>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                </Collapse>

            </Navbar >
        </>
    );
};

export default Header;