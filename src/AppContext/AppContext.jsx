import React, { createContext, useEffect, useState } from 'react';
import { app } from './../firebase/firebase.config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";

export const CoreContext = createContext(null);

const auth = getAuth(app);
const authenticationProvider = new GoogleAuthProvider();

const AppContext = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const GoogleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, authenticationProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const userObserver = onAuthStateChanged(auth, (currentlyLogged) => {
            setUser(currentlyLogged);
            setLoading(false);

            // Set the authorization token for all requests
            if (currentlyLogged) {
                currentlyLogged.getIdToken().then((token) => {
                    localStorage.setItem('token', token);
                });
            }
            else {
                localStorage.removeItem('token');
            }
        });

        return () => {
            userObserver();
        };
    }, []);

    const updateUserProfile = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        });
    };

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

    // Firebase parse error codes
    const parseCode = (authCode) => {
        switch (authCode) {
            case "auth/invalid-password":
                return "Password provided is not corrected";
            case "auth/invalid-email":
                return "Email provided is invalid";
            case "auth/weak-password":
                return "Weak password (Min. 6 Chars Required)";
            case "auth/email-already-in-use":
                return "Email already in use!"
            case "auth/user-not-found":
                return "Account does not exist! Please signup."
            case "auth/wrong-password":
                return "Wrong password!"
            default:
                return "Something wrong! Please try again.";
        }
    }

    const ContextMethods = {
        user,
        loading,
        setLoading,
        loginUser,
        registerUser,
        GoogleSignIn,
        logOut,
        updateUserProfile,
        theme,
        setTheme,
        parseCode
    };

    return (
        <CoreContext.Provider value={ContextMethods}>
            {children}
        </CoreContext.Provider>
    );
};

export default AppContext;