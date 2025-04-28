import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";


const PaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {backendUrl,token} = useContext(AppContext)
  

  const verifyPayment = async () => {
        try {
          const khaltiToken = searchParams.get("pidx");  // token from Khalti
          const appointmentId = searchParams.get("purchase_order_id"); // appointment id
          const amount = parseFloat(searchParams.get("amount"));  // Ensure amount is a number
  
          if (!khaltiToken || !appointmentId || !amount) {
            toast.error("Invalid payment details!");
            navigate("/");
            return;
          }
         
  
          const { data } = await axios.post(backendUrl +"/api/user/payment/verify", {
            appointmentId,
            khaltiToken,
            amount,
          },{headers:{token}});
          console.log('Token',token)
          console.log("1stplace",data)
  
          if (data.success) {
            toast.success("Payment Successful!");
            navigate("/my-appointments"); 
          } else {
            toast.error("Payment Failed!");
            navigate("/my-appointments");
          }
  
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong!");
          navigate("/");
        }
      };


  useEffect(() => {
    

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">Verifying Payment...</h2>
    </div>
  );
};

export default PaymentCallback;
