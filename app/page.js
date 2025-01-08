import React from 'react';
import Top from './components/Top';
import { fetchUsers } from './serveractions/serverActions';
import User from './components/User';

const page = async () => {
  const users = await fetchUsers();
  return (
    <>
      <div className="w-full text-white overflow-auto font-[Geist] relative h-screen bg-zinc-900">
        <div className="top w-full h-14">
          <Top />
        </div>
        <div className="w-full min-h-[91.3vh] p-10">
          <h1 className="text-lg">{users.data.length > 0 ? "All Users" : "No Users Found! Add One" }</h1>
          <div className="user mt-5 w-full flex flex-col gap-2">
            {users.data?.map((user) => {
              return <User user={user} key={user._id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
