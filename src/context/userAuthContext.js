import React from 'react';
import { createContext, Profiler, useContext, useEffect, useState } from 'react';
import { signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function googleSignIn() {
        const googProv = new GoogleAuthProvider();
        return signInWithPopup(auth, googProv);
    }

    function logOut() {
        return signOut(auth);
    }

    function saveUser(teachbool) { 

        try {
            const docRef = doc(db, "User", user.email)
            setDoc(docRef, {
                fullName: user.displayName,
                email: user.email,
                teacher: teachbool
            });
        }
        catch(e) {
            console.log(e.message);
            navigate("/");
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider value={{user, logOut, googleSignIn, saveUser}}> 
            {children} 
        </userAuthContext.Provider>
    ); 
}

export function useUserAuth() {
    return useContext(userAuthContext);
}