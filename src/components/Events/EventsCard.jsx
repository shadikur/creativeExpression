import { Button } from '@material-tailwind/react';
import React from 'react';

const EventsCard = () => {
    return (
        <>
            <div className="overflow-hidden bg-white rounded shadow">
                <div className="p-5">
                    <div className="relative">
                        <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                            <img
                                className="object-cover w-full h-full"
                                src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg"
                                alt=""
                            />
                        </a>
                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                                26 Aug 2023
                            </span>
                        </div>
                    </div>
                    <p className="mt-5 text-2xl font-semibold">
                        <a href="#" title="" className="text-black">
                            {" "}
                            How to build coffee inside your home in 5 minutes.{" "}
                        </a>
                    </p>
                    <p className="mt-4 text-base text-gray-600">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                        sint. Velit officia consequat duis enim velit mollit.
                    </p>
                    <Button color="lightBlue" ripple="light">
                        Get the tickets
                    </Button>
                </div>
            </div>
        </>
    );
};

export default EventsCard;