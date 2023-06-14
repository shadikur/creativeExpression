import React from 'react';
import Slider from '../components/Slider/Slider';
import Events from '../components/Events/Events';
import NewsLetter from '../components/NewsLetter/NewsLetter';
import PopInstructor from '../components/PopInstructor/PopInstructor';
import PopClasses from '../components/PopClasses/PopClasses';

const Home = () => {
    return (
        <>
            <Slider></Slider>
            <PopClasses></PopClasses>
            <PopInstructor></PopInstructor>
            <Events></Events>
            <NewsLetter></NewsLetter>
        </>
    );
};

export default Home;