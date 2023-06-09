import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Container from './Container';

const LandingPage = () => {

    return (
        <div className='dark:bg-gray-800'>
            <Container>
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </Container>
        </div>
    );
};

export default LandingPage;