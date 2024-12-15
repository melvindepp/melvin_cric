import React, { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading ,setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleUser = () => {
      setLoading(true);
      return signInWithPopup(auth , googleProvider);
  }
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const profileUpdate = (userInfo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, userInfo);
  };
  const logout = () => {
    setLoading(true)
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      console.log('current user : ' , currentUser)

      if(currentUser){
          const userInfo = {email : currentUser?.email};
          axiosPublic.post('/jwt' , userInfo)
          .then(res =>  {
              if(res.data.token){
                  localStorage.setItem("access-token" , res.data.token)
              }
             
          })
         
      }
      else{
        localStorage.removeItem("access-token");
    }
    setLoading(false);



    });

    return () => {
     return unsubscribe();
    }
  }, [axiosPublic]);

  const authInfo = {
    user,
    createUser,
    loginUser,
    profileUpdate,
    logout,
    loading,
    setLoading,
    googleUser
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
