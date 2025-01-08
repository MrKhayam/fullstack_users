'use client';
import React, { useContext, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { editUsers, handleForm } from '../serveractions/serverActions';
import toast, { Toaster } from 'react-hot-toast';
import userContext from '../context/userContext';


const AddUser = () => {
    const [loading, setLoading] = useState(false);
    const { isAddUser, setIsAddUser, name, setName, email, setEmail, currentEditId, setCurrentEditId } =
      useContext(userContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = { name, email };
            const response = currentEditId !== null ? await editUsers(currentEditId, data, "/") : await handleForm(data, "/");
            if(response.success == false) {
                toast.error(response.message);
            }
            else {
            setIsAddUser(false);
            }
        } catch (error) {
            toast.error(error);
        } finally{
            setLoading(false);
            setName('');
            setEmail('');
            setCurrentEditId(null);
        }

    }
    
    
  return (
    <>
      <div className="w-full text-black h-screen absolute flex items-center justify-center top-0 right-0 bg-[#4c4c4c6e] backdrop-blur-sm md:p-0 p-2">
        <Toaster />
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded relative w-96 h-auto p-3"
        >
          <IoClose
            onClick={() => {
              setIsAddUser(false);
              setName('');
              setEmail('');
              setCurrentEditId(null);
            }}
            color="black"
            className="absolute top-2 right-2"
            size={25}
            cursor="pointer"
          />
          <h1 className="pt-4 text-lg">
            {currentEditId !== null ? "Edit User Details" : "Add New User"}
          </h1>
          <div className="flex flex-col mt-3">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-none border border-zinc-500 p-2 h-12 rounded"
              type="text"
              id="name"
              placeholder="Enter Your Name..."
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none border border-zinc-500 p-2 h-12 rounded"
              type="text"
              id="email"
              placeholder="Enter Your Email..."
            />
          </div>
          <div className="mt-3 w-full flex items-center justify-end">
            <button
              disabled={loading}
              className="bg-black text-white rounded px-6 py-2 transition-all disabled:cursor-not-allowed disabled:bg-zinc-500 duration-300 hover:bg-zinc-900"
            >
              {loading ? "Loading..." : currentEditId !== null ? 'Save Changes' : 'Add New User'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
