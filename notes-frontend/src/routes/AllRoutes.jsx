import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signuppage from "../pages/Signuppage";
import Loginpage from "../pages/Loginpage";
import Notespage from "../pages/Notespage";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes(){
    return <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<Signuppage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/notes" element={<PrivateRoute><Notespage /></PrivateRoute>}></Route>
    </Routes>
}