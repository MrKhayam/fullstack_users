'use client';
import React, { useContext, useState } from 'react';
import AddUser from './AddUser';
import userContext from '../context/userContext';

const Top = () => {
  const {isAddUser, setIsAddUser} = useContext(userContext);
  return (
    <>
    {isAddUser && <AddUser />}
      <div className="w-full px-5 flex justify-between items-center h-full bg-zinc-800 border-b">
        <h1 className='text-xl font-semibold'>Users Data</h1>
        <button onClick={() => setIsAddUser(true)} className='px-6 py-2 transition-all duration-300 hover:bg-[#dadada] bg-white rounded text-black'>Add User</button>
      </div>
    </>
  );
}

export default Top;
