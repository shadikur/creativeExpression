import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const EventsCard = ({ event }) => {
    return (
        <>
            <div className="overflow-hidden bg-white rounded shadow">
                <div className="p-5">
                    <div className="relative">
                        <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                            <img
                                className="object-cover w-full h-full"
                                src={event.eventImg}
                                alt={event.eventTitle}
                            />
                        </a>
                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                                {event.date}
                            </span>
                        </div>
                    </div>
                    <p className="mt-5 text-2xl font-semibold">
                        <a href="#" title="" className="text-black">
                            {event.eventTitle}
                        </a>
                    </p>
                    <p className="mt-4 text-base text-gray-600">
                        {event.eeventDesc.slice(0, 100) + "..."}
                    </p>
                    <Link to={event.ticketLink}>
                        <Button color="lightBlue" ripple={true}>
                            Get the tickets
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default EventsCard;