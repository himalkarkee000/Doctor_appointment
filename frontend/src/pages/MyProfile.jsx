import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";

import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(true);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.data);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <>
        <div className="max-w-lg flex flex-col  gap-2 text-md">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-90"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? "" : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img className="w-36 rounded" src={userData.image} alt="" />
          )}

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
          <p className="text-neutral-500 underline mt-3 ">
            CONTACT INFORMATION
          </p>
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
                  value={userData.address?.line1 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                />

                <input
                  className="bg-gray-100 max-w-52 text-blue-400"
                  type="text"
                  value={userData.address?.line2 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
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
                  value={userData.gender}
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
              {/* {isEdit ? <input  className="max-w-32 bg-gray-100" type="date" /> : <p>{userData.dob}</p>} */}
              {isEdit ? (
                <input
                  className="max-w-32 bg-gray-100"
                  type="date"
                  value={userData.dob || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>
          <div>
            {isEdit ? (
              <button
                className="border border-blue-500 mt-4 rounded-full px-8 py-2 hover:bg-primary hover:text-white transition-all"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="border border-blue-500 mt-4 rounded-full px-8 py-3 hover:bg-primary hover:text-white transition-all"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default MyProfile;
