
import Homepage from "./Comp/Home/Homepage";
import Footer from "./Comp/Common/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CallToAction from "./Comp/Home/CallToAction";
import Contact from "./Comp/Home/Contact";
import Features from "./Comp/Home/Features";
import OurClasses from "./Comp/Home/OurClasses";
import Schedule from "./Comp/Home/Schedule";
import Trainers from "./Comp/Home/Trainers";
import Signup from "./Comp/User/Signup";
import ErrorPage from "./Comp/Common/ErrorPage";
import ReviewMember from "./Comp/User/ReviewMember";
import Login from "./Comp/User/Login";
import Header from "./Comp/Common/Header";
import FileUpload from "./Comp/Home/FileUpload";
function App() {
  return (
    <BrowserRouter>
    <Header />
 
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/calltoaction" element={<CallToAction />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<Features />} />
            <Route path="/ourclasses" element={<OurClasses />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login/>} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/user-review" element={<ReviewMember/>} />
            <Route path="/file" element={<FileUpload/>} />

          </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
