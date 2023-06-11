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
import axios from 'axios';
import Swal from 'sweetalert2';

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

    const getIdToken = (email) => {
        const response = axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth`, { email });
        return response;
    };

    const [photo, setPhoto] = useState("");

    // Upload image to blob storage
    const uploadImage = async (e) => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        });

        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch('https://blob.mylab.shadikur.com/multer', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Authorization: import.meta.env.VITE_BLOB_TOKEN,
                        }
                    });

                    const result = await response.json();
                    console.log(result);
                    setPhoto(result.imageUrl);

                    Swal.fire({
                        title: 'Your uploaded picture',
                        imageUrl: e.target.result,
                        imageAlt: 'The uploaded picture'
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        const userObserver = onAuthStateChanged(auth, (currentlyLogged) => {
            setUser(currentlyLogged);
            setLoading(false);
            // Set the authorization token for all requests
            if (currentlyLogged) {
                currentlyLogged.getIdToken(currentlyLogged.email).then((token) => {
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
                return `${authCode}`;
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
        parseCode,
        uploadImage,
        photo,
        setPhoto
    };

    return (
        <CoreContext.Provider value={ContextMethods}>
            {children}
        </CoreContext.Provider>
    );
};

export default AppContext;