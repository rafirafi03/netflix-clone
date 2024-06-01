import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {auth, db} from '../services/firebase';

const AuthContext = createContext();

export function AuthContextProvider({children}) {

    const [user, setUser] = useState({});

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return ()=> {
            unsubscribe();
        }
    }, []);

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    return( 
    <AuthContext.Provider value={{ user, signUp, login, logout}}>
        {children}
    </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext);
}

export default UserAuth