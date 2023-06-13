import React from 'react';
import Slider from '../components/Slider/Slider';
import Events from '../components/Events/Events';
import NewsLetter from '../components/NewsLetter/NewsLetter';
import PopInstructor from '../components/PopInstructor/PopInstructor';

const Home = () => {
    return (
        <>
            <Slider></Slider>
            <PopInstructor></PopInstructor>
            <Events></Events>
            <NewsLetter></NewsLetter>
        </>
    );
};

export default Home;