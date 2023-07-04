import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";
import { saveItem } from "../utils/firebaseFunctions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../utils/firebase-config";
import { useStateValue } from "../context/StateProvider";

const Register = () => {
  const history = useNavigate();
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const [form, setForm] = useState({
    sender_detail: "",
    user_detail: "",
    activity_description: "",
    activity_date: "",
  });

  const [{ user }, dispatch] = useStateValue();

  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [complaintUploaded, setComplaintUploaded] = useState(false);

  const saveDetails = async () => {
    setIsLoading(true);
    try {
      if (
        !form.sender_detail ||
        !form.user_detail ||
        !form.activity_description ||
        !form.activity_date ||
        !imageAsset
      ) {
        setIsLoading(false);
      } else {
        const data = {
          id: `${Date.now()}`,
          sender_detail: form.sender_detail,
          user_detail: form.user_detail,
          activity_description: form.activity_description,
          activity_date: form.activity_date,
          activity_imageURL: imageURL,
          uid: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          activity_resolved: false,
        };
        await saveItem(data);
        setIsLoading(false);
        setComplaintUploaded(true);
        setImageAsset(null);
        toast.success("Complaint Added Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setComplaintUploaded(false);
          history("/mycomplaints");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  };

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setTimeout(() => {
            setImageUploaded(true);
          }, 4000);
          setImageURL(downloadURL);
        });
      }
    );
  };

  const deleteImage = (e) => {
    setIsLoading(false);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setTimeout(() => {}, 4000);
    });
  };

  return (
    <div className="">
      <div className="flex items-center justify-center gap-2  bg-gray-gradient p-5">
        <Link
          to="/profile"
          type="button"
          className="text-white bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          My Profile
        </Link>
        <Link
          to="/mycomplaints"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          My Complaints
        </Link>
      </div>
      <div className="bg-[#e5e5e7] flex justify-center items-center flex-col  sm:p-10 p-4">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Register a Complaint
          </h1>
          <ToastContainer />
        </div>
        <div className="w-full mt-[65px] flex flex-col gap-[30px]">
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Sender Email/Phone Number *"
              placeholder="Enter the details about the sender"
              inputType="text"
              value={form.sender_detail}
              handleChange={(e) => handleFormFieldChange("sender_detail", e)}
            />
            <FormField
              labelName="Date of occurrence *"
              placeholder="End Date"
              inputType="date"
              value={form.activity_date}
              handleChange={(e) => handleFormFieldChange("activity_date", e)}
            />
          </div>
          <FormField
            labelName="Describe the activity *"
            placeholder="Write some information about the activity through which the relevant authorities can take necessary action"
            isTextArea
            value={form.activity_description}
            handleChange={(e) =>
              handleFormFieldChange("activity_description", e)
            }
          />
          <FormField
            labelName="Receiver Email/Phone Number *"
            placeholder="Enter the details about the receiver"
            inputType="text"
            value={form.user_detail}
            handleChange={(e) => handleFormFieldChange("user_detail", e)}
          />
          <div>
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="w-full h-full cursor-pointer">
                      <label className="mb-1 block text-base font-medium text-[#07074D]">
                        Upload Image:
                      </label>

                      <input
                        type="file"
                        name="uploadImage"
                        accept="image/*"
                        onChange={uploadImage}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full lg:h-[250px]">
                      <img
                        src={imageAsset}
                        alt="uploaded img"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out "
                        onClick={deleteImage}
                      >
                        <MdDelete className="text-black" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex justify-center items-center mt-[40px]">
            <button
              onClick={saveDetails}
              className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
            >
              Register complaint
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
