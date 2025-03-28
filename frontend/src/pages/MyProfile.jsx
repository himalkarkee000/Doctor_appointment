import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Himal Karki",
    image: assets.profile_pic,
    email: "himalkarki123@gmail.com",
    phone: 9861122752,
    address: {
      line1: "Nagarjun-14",
      line2: "Kalanki Kathmandu",
    },
    gender: "Male",
    dob: "2022-08-18",
  });
  const [isEdit, setIsEdit] = useState(true);

  return (
    <>
      <div className="max-w-lg flex flex-col  gap-2 text-md">
        <img className="w-36 rounded" src={userData.image} alt="" />
        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="bg-gray-50 text-3xl font-medium max-w-60 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <p className="text-neutral-500 underline mt-3 ">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500 ">
            <p className="font-medium">Email id:</p>
            {isEdit ? (
              <input
              className="text-blue-500"
                type="text"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-500">{userData.email}</p>
            )}
            <p className="font-medium">Phone: </p>
            {isEdit ? (
              <input
              className="bg-gray-100 max-w-52 text-blue-400"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address: </p>
            {isEdit ? (
              <p>
                <input
                className="bg-gray-100 max-w-52 text-blue-400"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
                <br />
                <input
                  type="text"
                  className="bg-gray-100 max-w-52 text-blue-400"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </p>
            ) : (
              <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
         
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
            <p className="font-medium">Gender :</p>
            {isEdit ? (
              <select
              className="max-w-32 bg-gray-100"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
            <p className="font-medium">Birthday: </p>
            {isEdit ? <input  className="max-w-32 bg-gray-100" type="date" /> : <p>{userData.dob}</p>}
          </div>
        </div>
        <div>
          {isEdit ? (
            <button className="border border-blue-500 mt-4 rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(false)}>Save Information</button>
          ) : (
            <button className="border border-blue-500 mt-4 rounded-full px-8 py-3 hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(true)}>Edit</button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
