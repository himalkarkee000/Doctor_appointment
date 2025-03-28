import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Doctors from "./pages/Doctor";
import LogIn from "./pages/LogIn";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Appoitment from "./pages/Appoitment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyAppoitment from "./pages/MyAppoitment";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appoinment/:docId" element={<Appoitment />} />
        <Route path="/my-appoiments" element={<MyAppoitment/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
