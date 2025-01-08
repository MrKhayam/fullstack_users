"use client";
import React, { useState } from "react";
import userContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [isAddUser, setIsAddUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentEditId, setCurrentEditId] = useState(null);
  return (
    <>
      <userContext.Provider
        value={{ isAddUser, setIsAddUser, name, setName, email, setEmail, currentEditId, setCurrentEditId }}
      >
        {children}
      </userContext.Provider>
    </>
  );
};

export default UserContextProvider;
