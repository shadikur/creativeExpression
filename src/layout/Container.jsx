import React from 'react';

const Container = ({ children }) => {
    return (
        <div className='md:container mx-auto'>
            {children}
        </div>
    );
};

export default Container;