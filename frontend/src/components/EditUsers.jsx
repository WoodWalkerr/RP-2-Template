import React, { useState } from "react";
import { updateUser } from "../services/userServices";

const EditUsers = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userInfo);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div>
        <button onClick={toggleModal} className="bg-blue-500 px-5">
          EDIT
        </button>
      </div>
      {showModal && (
        <div className="fixed z-10 bg-slate-500">
          <form>
            <h2 className="text-lg font-bold text-black"></h2>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="name...."
                value={userInfo.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email...."
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                  toggleModal();
                }}
                className="bg-green-500"
              >
                Save
              </button>
            </div>
            <div>
            <button onClick={toggleModal} className="bg-red-500">
              cancel
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUsers;
