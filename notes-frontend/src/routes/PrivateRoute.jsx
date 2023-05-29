import { useSelector } from "react-redux";
import Loginpage from "../pages/Loginpage"

export default function PrivateRoute({children}) {
    const {auth} = useSelector((state)=>state.userReducer)
    if(auth)
    return children
    return <Loginpage></Loginpage>
}