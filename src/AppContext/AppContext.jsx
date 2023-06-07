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

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
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
        const offLoad = onAuthStateChanged(auth, (currentlyLogged) => {
            setUser(currentlyLogged);
            setLoading(false);
        });

        return () => {
            offLoad();
        };
    }, []);

    const profileUpdate = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        });
    };

    const ContextMethods = {
        user,
        loading,
        setLoading,
        signIn,
        signUp,
        GoogleSignIn,
        logOut,
        profileUpdate,
    };

    return (
        <CoreContext.Provider value={ContextMethods}>{children}</CoreContext.Provider>
    );
};

export default AppContext;