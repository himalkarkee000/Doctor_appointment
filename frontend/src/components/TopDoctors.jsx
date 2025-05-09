import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// import { doctors } from "../assets/assets";



const TopDoctors = () => {
    const navigate = useNavigate();
    const {doctors} =useContext(AppContext)
    // console.log("Doctors from context:", doctors); 
    
  return (
    <div className="flex items-center flex-col gap-4 py-16 text-gray-500 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-small">
        Simply browse through our extensive list of trusted doctors
      </p>
      <div  className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0,10).map((item, index) => (
         
          <div onClick={()=>{navigate(`/appoinment/${item._id}`);scrollTo(0,0)} }
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-2">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
             
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.speciality}</p>
              
            </div>
          </div>
        ))}   
      </div>
    
      <button onClick={()=>navigate('/doctors')} className="bg-blue-50 rounded-full px-12 py-3 mt-10 ">More</button>
    </div>
  );
};

export default TopDoctors;
