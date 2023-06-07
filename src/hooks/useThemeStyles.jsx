import React, { useState, useEffect } from 'react';

const useThemeStyles = () => {
    // Create a theme switcher
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    useEffect(() => {
        localStorage.setItem('theme', theme);
        // Using tailwind dark mode switcher
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme]);

    return [theme, setTheme];
};

export default useThemeStyles;
