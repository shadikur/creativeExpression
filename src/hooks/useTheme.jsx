import { useEffect, useState } from "react";

const useTheme = () => {
    // On load of the page we check if the user has a theme saved in local storage
    // If they do we use that theme, otherwise we use the default theme
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    // We save the theme to local storage so that when the user refreshes the page
    // the theme is still applied
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }
        , [theme]);
    // We return the theme and a function to toggle the theme
    return [theme, setTheme];
};
export default useTheme;