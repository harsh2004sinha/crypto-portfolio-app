"use client";

import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";

// Define the type for the user object
interface Userss {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id:String,
}

// Define the type for the context
interface Loginctx {
  user: Userss;
  setUser: React.Dispatch<React.SetStateAction<Userss>>;
}

// Create the context with an initial value of undefined
export const LoginContext = createContext<Loginctx | undefined>(undefined);

// Create the context provider component
const LoginContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize the user state with default empty values
  const [user, setUser] = useState<Userss>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    id: "",
  });

  useEffect(() => {
    // Save user to local storage whenever it changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
