import React from 'react';
import useThemeStyles from '../hooks/useThemeStyles';

const Container = ({ children }) => {
    return (
        <div className='container mx-auto'>
            {children}
        </div>
    );
};

export default Container;