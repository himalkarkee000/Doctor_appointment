import validator from "validator";
import bcrypt from "bcrypt";
import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import DoctorModel from "../model/doctorModel.js";
import AppointmentModel from "../model/appointmentModel.js";
import axios from "axios";

//API to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!name || !password || !email) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a Strong Password" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    //save to data base
    const newUser = new UserModel(userData);
    const user = await newUser.save();

    //create a token throw which User can login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Doesn't exit",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid Creanditial",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//To get the User Profile Data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await UserModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//APi to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data missing",
      });
    }

    await UserModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await UserModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Api to book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await DoctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor Not available",
      });
    }
    let slots_booked = docData.slots_booked;

    //checking for slots availabiltiy
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot Not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await UserModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };
    const newAppointment = new AppointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots data in docData
    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({
      success: true,
      message: "Appointment Booked",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Api to get user appointments for Frontend my-appointments pages

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await AppointmentModel.find({ userId });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Api To cancel the appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await AppointmentModel.findById(appointmentId);

    //verify appointment User
    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthorised action",
      });
    }
    await AppointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    await AppointmentModel.findByIdAndDelete(appointmentId, {
      cancelled: true,
    });
    //Releasing Doctor Slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await DoctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await DoctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment cancelle",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// //Api to make payment of appointment usingKhalti

const payment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    const userId = decoded.id;

    // (optional) Check if the appointment belongs to the user, if needed
    //   const { userId } = req.body;
    const user = await UserModel.findById(userId).select("name email phone");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const appointment = await AppointmentModel.findById(appointmentId);

    // Create Khalti Payment Payload
    const payload = {
      return_url: "http://localhost:5174/payment/verify",
      website_url: "http://localhost:5174",
      amount: 100 * appointment.amount, // Amount in paisa (1 rupee = 100 paisa)
      purchase_order_id: appointmentId,
      purchase_order_name: "Doctor Appointment Payment",
      customer_info: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    };

    // Make API request to Khalti to initiate payment
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

      console.log("Khalti Response =>", response.data);

    // Send payment URL to frontend
    return res.json({
      success: true,
      payment_url: response.data.payment_url,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.json({
      success: false,
      message: error.response?.data?.detail || "Something went wrong",
    });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { appointmentId, khaltiToken, amount } = req.body;
    console.log("Request Body:", req.body);
    if (!khaltiToken || !amount) {
        return res.status(400).json({ success: false, message: "Missing khaltiToken or amount" });
      }

      console.log("Khalti Token:", khaltiToken);

    // Call Khalti API to verify payment
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      {
        token: khaltiToken,
        amount: amount * 100, // Convert amount to paisa
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    console.log("Khalti API Response:", response.data)

    if (response.data.idx) {
      const appointment = await AppointmentModel.findById(appointmentId);
      if (!appointment) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment not found" });
      }

      // Mark payment as successful
      appointment.payment = true;
      appointment.isCompleted = true;
      await appointment.save();

      return res.json({
        success: true,
        message: "Payment verified",
        appointment,
      });
    } else {
      return res.json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.json({
      success: false,
      message: error.response?.data?.detail || "Verification failed",
    });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  payment,
  verifyPayment,
};
