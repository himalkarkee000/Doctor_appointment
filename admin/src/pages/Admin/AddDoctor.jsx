import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {
  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 year')
  const [fees,setFees] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState('General physicial')
  const [degree,setDegree] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')
  

 

  const {backendUrl , aToken} = useContext(AdminContext)

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      if(!docImg){
        return toast.error(" Image Not selected")
      }

      const formData = new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',fees)
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      // //console/log form data
      // formData.forEach((value,key)=>{
      //   console.log(`${key}:${value}`)
      // })

      const {data} = await axios.post(backendUrl +'/api/admin/add-doctor',formData,{
        headers:{aToken}
      })
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setAbout('')
        setDegree('')
        setFees('')

       
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
      
    }

  }
  return (
    <form  onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-image">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg? URL.createObjectURL(docImg): assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id={`doc-image-${name}`} hidden />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col  gap-4">
            <div className="flex flex-col gap-1">
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email}
                className="border rounded px-3 py-1"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-1" type="password" placeholder="Password" required />
            </div>

            <div className="flex flex-col gap-1">
              <p>Doctor Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-1" name="experience" id="experience">
                <option value="1 year">1 Year</option>
                <option value="2 years">2 Years</option>
                <option value="3 years">3 Years</option>
                <option value="4 years">4 Years</option>
                <option value="5 years">5 Years</option>
                <option value="6 years">6 Years</option>
                <option value="7 years">7 Years</option>
                <option value="8 years">8 Years</option>
                <option value="9 years">9 Years</option>
                <option value="10 years">10 Years</option>
                <option value="10+ years">10+ Years</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p>Fee</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees}
                className="border rounded px-3 py-1"
                type="texnumber"
                placeholder="fee"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-1" name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynocologist">Gynocologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="City And Street"
                required
              />
              <input onChange={(e)=>setAddress2(e.target.value)} value={address2}
                className="border rounded px-3 py-1"
                type="text"
                placeholder="Provience"
                required
              />
            </div>
          </div>
        </div>
        <div className="">
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about}
            className="w-full px-4 pt-2 border rounded"
            type="text"
            placeholder="Writes about Doctor"
            rows={5}
            required
          />
        </div>
        <button type="submit" className="bg-primary rounded-full mt-5 px-10 py-2 text-white font-medium ">Add doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
