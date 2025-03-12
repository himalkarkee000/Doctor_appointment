import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appoitment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeeks = ['Sun','Mon','Tue','Wed',"Thus","Fri",'Sat']

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);

    setDocInfo(docInfo);
  };

  const getAvailablaleSlots = async () => {
    setDocSlots([]);

    //getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of the date and with index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slot for array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        //Increment current time by 30 min

        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailablaleSlots();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* Doctors details */}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="">
            <img
              className=" bg-primary  w-full  sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400  rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Doctor info */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-600">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600 text-md">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-3 border border-gray-600 text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* Doctors About  */}
            <div>
              <p className="flex items-center gap-2 text-md font-medium text-gray-900 mt-1">
                About <img className="w-4" src={assets.info_icon} alt="" />
              </p>
              <p className="text-gray-500 text-sm max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appoinment fee:
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
     {/* Booking Slots*/}
     <div className="sm:ml:72 sm:pl-4 mt-4 font-medium text-gray-700">
      <p>Booking Slots</p>
      <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
        {
          docSlots.length && docSlots.map((items,index)=>(
           <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ?'bg-primary text-white':"border border-gray-500"}`} key={index}>
            <p>{items[0] && daysOfWeeks[items[0].datetime.getDay()]}</p>
            <p>{items[0] && items[0].datetime.getDate()}</p>
           </div>
          ))
        }
      </div>
      <div className="flex items-center gap-3 mt-2 w-full overflow-x-scroll ">
        {docSlots.length >0 && docSlots[slotIndex].map((item,index)=>(
            
          <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white':'text-gray-400 border border-gray-300'}`} key={index}>
            {item.time.toLowerCase()}
          
          </p>
        ))}
      </div>
     </div>
      </div>
    )
  );
};

export default Appoitment;
