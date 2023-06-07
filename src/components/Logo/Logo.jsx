import React, { useContext } from 'react';
import { CoreContext } from '../../AppContext/AppContext';

const Logo = () => {
    const { theme } = useContext(CoreContext);
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