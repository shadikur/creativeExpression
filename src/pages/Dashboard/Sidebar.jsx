import React, { useContext, useState } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Switch,
    Drawer,
    Button,
} from "@material-tailwind/react";

import {
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";

import { FaUsers, FaBookReader, FaRegCalendar, FaRegMoneyBillAlt } from "react-icons/fa";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Logo from '../../components/Logo/Logo';
import { CoreContext } from '../../AppContext/AppContext';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';


const Sidebar = () => {
    const [open, setOpen] = useState(0);

    const [openSidebar, setOpenSidebar] = useState(true);
    const openDrawer = () => setOpenSidebar(true);
    const closeDrawer = () => setOpenSidebar(false);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const { theme, setTheme } = useContext(CoreContext);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
    }


    return (
        <div>
            <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-2xl dark:bg-gray-800 dark:text-gray-100 bg-white">
                <div className="mb-2 flex items-center gap-4 p-4">
                    <Logo></Logo>
                </div>

                <List>
                    <ListItem>
                        <ListItemPrefix>
                            <MdOutlineDashboard className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <Accordion
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <FaUsers className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Manage Users
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link to="/dashboard/viewusers">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        View Users
                                    </ListItem>
                                </Link>
                                <Link to="/dashboard/addusers">
                                    <ListItem>

                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Add User
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 2}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <FaBookReader className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Manage Classes
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link to="/dashboard/viewcoursecategory">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        View Categories
                                    </ListItem>
                                </Link>
                                <Link to="/dashboard/addcoursecategory">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Add Categories
                                    </ListItem>
                                </Link>
                                <Link to="/dashboard/addclasses">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Add Classes
                                    </ListItem>
                                </Link>
                                <Link to="/dashboard/viewclasses">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        View Classes
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>

                    <Accordion
                        open={open === 3}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 3}>
                            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <FaRegCalendar className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Manage Events
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link to="/dashboard/viewevents">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        View All Events
                                    </ListItem>
                                </Link>
                                <Link to="/dashboard/addevents">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        Publish Events
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 4}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 4}>
                            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    <FaRegMoneyBillAlt className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Payment Summary
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link to="/dashboard/viewpayments">
                                    <ListItem>
                                        <ListItemPrefix>
                                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                        </ListItemPrefix>
                                        View Transactions
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <hr className="my-2 border-blue-gray-50" />
                    <Link to="/dashboard/viewprofile">
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                    </Link>
                    <Link to="/dashboard/settings">
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                    </Link>

                    <Button className="w-full flex justify-center items-center gap-4" onClick={handleLogout}>
                        <PowerIcon className="h-5 w-5" />
                        Log Out
                    </Button>
                </List>
                <hr className="my-2 border-blue-gray-50" />
                {/* Light and Dark Mode Swith */}
                <div className="flex items-center justify-between px-4 py-2">
                    <Typography color="blue-gray" className="font-normal">
                        Dark Mode
                    </Typography>
                    <Switch id="blue" color="blue" onChange={toggleTheme} defaultChecked={theme == 'dark' ? true : false} />
                </div>


            </Card>
        </div >
    );
};

export default Sidebar;