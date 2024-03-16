import { Link } from "react-router-dom"
import { IoHomeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdEditDocument, MdOutlineExplore } from "react-icons/md"
import { PiSignInBold } from "react-icons/pi";
import Logout from "./Logout";

const Sidebar = () => {
    const authUser = true;

    return (
        <aside
            className="flex flex-col items-center min-w-12 sm:w-16
            sticky top-0 left-0 h-screen py-8 overflow-y-auto border-r
            bg-glass"
        >
            <nav className="h-full flex flex-col gap-3">

                {/* Link to Home Page with Github Logo */}
                <Link to='/' className="flex justify-center">
                    <img className="h-8" src="/github.svg" alt="Github logo" />
                </Link>

                {/* Link to Home Page with Home React icon */}
                <Link
                    to='/'
                    className="p-1.5 flex justify-center
                    transition-colors duration-200
                    rounded-lg hover:bg-gray-800"
                >
                    <IoHomeSharp size={20}/>
                </Link>

                {/* If User is Authenticated, link to Like Page with Like React icon */}
                {authUser && (
                    <Link
                        to='/likes'
                        className="p-1.5 flex justify-center
                        transition-colors duration-200
                        rounded-lg hover:bg-gray-800"
                    >
                        <FaHeart size={20}/>
                    </Link>
                )}

                {/* If User is Authenticated, link to Explore Page with Explore React icon */}
                {authUser && (
                    <Link
                        to='/explore'
                        className="p-1.5 flex justify-center
                        transition-colors duration-200
                        rounded-lg hover:bg-gray-800"
                    >
                        <MdOutlineExplore size={25}/>
                    </Link>
                )}

                {/* If user is not logged in */}
                {!authUser && (
                    <Link
                        to='/login'
                        className="p-1.5 focus:outline-nones
                        transition-colors duration-200
                        rounded-lg hover:bg-gray-800"
                    >
                        <PiSignInBold size={25}/>
                    </Link>
                )}

                {/* Button to signUp */}
                {!authUser && (
                    <Link
                        to='/signup'
                        className="p-1.5 focus:outline-nones
                        transition-colors duration-200
                        rounded-lg hover:bg-gray-800"
                    >
                        <MdEditDocument size={25}/>
                    </Link>
                )}

                {/* Button to logout if user signed in */}
                {authUser && (
                    <div className="flex flex-col gap-2 mt-auto">
                        <Logout />
                    </div>
                )}

            </nav>
        </aside>
    )
}

export default Sidebar