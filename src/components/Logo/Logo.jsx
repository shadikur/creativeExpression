import React from 'react';
import useThemeStyles from '../../hooks/useThemeStyles';

const Logo = () => {
    const theme = useThemeStyles();
    console.log(theme);
    return (
        <div>
            {
                theme == 'light' ?
                    <img src="https://res.cloudinary.com/ddez9nchs/image/upload/v1686090505/CreativeExpressions/creative-expressions-high-resolution-logo-color-on-transparent-background.png" alt="logo" className="h-8" />
                    :
                    <img src="https://res.cloudinary.com/ddez9nchs/image/upload/v1686090505/CreativeExpressions/creative-expressions-low-resolution-logo-white-on-transparent-background.png" alt="logo" className="h-8" />
            }
        </div>
    );
};

export default Logo;