import { Route, Routes } from "react-router";
import LandingPage from "../pages/landingpage";
import Login from "../pages/loginpage";
import RegisterDoctor from "../pages/registerpage";
import UserRegister from "../pages/userregister";
import DoctorDashboard from "../pages/docterdashboard";
import UserDashboard from "../pages/userdashboard";
import SymptomsAnalyzer from "../pages/symptomanalyzer";

function Home(){

return(

<Routes>

<Route path="/" element={<LandingPage />} />

<Route path="/login" element={<Login />} />

<Route path="/registerdoctor" element={<RegisterDoctor />} />

<Route path="/userregister" element={<UserRegister />} />

<Route path="/drdash" element={<DoctorDashboard />} />

<Route path="/userdash" element={<UserDashboard />} />

<Route path="/symptom" element={<SymptomsAnalyzer />} />

</Routes>

)

}

export default Home;