import React, { useEffect, useState } from "react";
import { getAllusers, deleteUser } from "../services/userServices";
import EditUsers from "./EditUsers";

const AdminList = () => {
  const [users, setUsers] = useState([]);

  const handleUser = async (id) => {
    try {
      const success = await deleteUser(id);
      if (success) {
        setUsers((prevState) => prevState.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const fetchUser = await getAllusers();
          setUsers(fetchUser);
        } catch (error) {
          console.error(error.message);
        }
      };
    const interval = setInterval(() => {
      fetchUsers();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-slate-400">
      <h1>List Dashboard</h1>
      <table className="max-w-6xl mx-auto rounded-[20px] bg-white table-auto">
        <thead>
          <tr>
            <td className="text-center" colSpan={5}>User List</td>
          </tr>
          <tr>
            <th className="py-10 text-sm font-semibold">#</th>
            <th  className="py-10 text-sm font-semibold">Name</th>
            <th  className="py-10 text-sm font-semibold">Email</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((users, index) => (
            <tr key={users.id} className="bg-white">
              <td className="px-6 text-center text-gray-500">{index + 1}</td>
              <td className="px-6 text-center text-gray-500">{users.name}</td>
              <td className="px-6 text-center text-gray-500">{users.email}</td>
              <td>
                <button
                  onClick={() => handleUser(users.id)}
                  className="bg-red-500 rounded-md px-3"
                >
                  DELETE
                </button>
              </td>
              <td>
                <button>
                  <EditUsers user={users} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
