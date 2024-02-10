import {Link} from "react-router-dom"
import { useAppContext } from "../contexts/appcontext";
import SignOutButton from "./signoutButton";

const Header = () => {
    const {isLoggedIn} = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to={`/`}>holiday.com</Link>
                </span>
                <span className="flex space-x-2">
                    {
                        isLoggedIn ? <>
                            <Link className="flex items-center text-white font-bold hover:bg-blue-600" to={`/my-bookings`}>My bookings</Link>
                            <Link className="flex items-center text-white font-bold hover:bg-blue-600" to={`/my-hotels`}>My Hotels</Link>
                            <SignOutButton />
                        </> 
                        :
                        <Link to={`/sign-in`} className="flex items-center bg-white px-3 text-blue-600 font-bold hover:bg-gray-100">Sign In</Link>
                    }
                    
                </span>
            </div>
        </div>
    )
}

export default Header;