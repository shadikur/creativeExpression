import React from 'react';
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Banner = ({ links }) => {
    return (
        <div className="bg-[url('https://img.freepik.com/premium-vector/kids-arts-crafts-lessons-creativity-class-concept-banner-flyer_605858-1677.jpg')] w-full h-[200px] bg-contain  bg-black flex items-center justify-center">
            <Breadcrumbs>
                <Link to={`/`} className="opacity-60">
                    <FaHome></FaHome>
                </Link>
                {
                    links.map((link, index) =>
                        <Link to={link.url} key={index} className="opacity-60">
                            <span>{link.label}</span>
                        </Link>

                    )

                }
            </Breadcrumbs>
        </div>
    );
};

export default Banner;