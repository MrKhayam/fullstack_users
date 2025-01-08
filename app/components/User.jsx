'use client';
import React, { useContext } from 'react';
import { deleteUser } from '../serveractions/serverActions';
import toast, { Toaster } from 'react-hot-toast';
import userContext from '../context/userContext';



const User = ({user}) => {


  const {setIsAddUser, setName, setEmail, setCurrentEditId} = useContext(userContext);
  
  
    const handleDelete = async (userId) => {
        const result = await deleteUser(userId,"/");
        if(result.success) {
            console.log("User Deleted Successfully.")
        }else {
           toast.error(result.message);
        }
    }




    const handleEdit = async (currentUser) => {
      setIsAddUser(true);
      setName(currentUser?.name);
      setEmail(currentUser?.email);
      setCurrentEditId(currentUser?._id);
    }
    
    
    
  return (
    <>
      <div className="md:w-[60%] w-full md:flex-row flex-col text-black flex md:justify-between p-3 md:items-center md:h-12 bg-white rounded">
        <Toaster />
        <h1 className='md:text-lg md:font-semibold text-2xl font-bold'>{user?.name}</h1>
        <p className='md:text-[16px] text-sm md:text-black text-[#5f5f5f]'>{user?.email}</p>
        <div className="flex gap-2 md:mt-0 mt-5 md:justify-normal justify-end">
          <button onClick={() => handleEdit(user)} className="bg-black px-6 py-2 rounded text-white">
            Edit
          </button>
          <button onClick={() => handleDelete(user._id)} className="bg-red-500 px-6 py-2 rounded text-white">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default User;
