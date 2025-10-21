import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";


function NavBar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    console.log(auth)

    return (
        <div>
            <nav>
                <ul className="navbar-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/fundraiser">Fundraisers</Link>
                    </li>
                    <li>
                        {auth.token ? (
                            <Link to="/" onClick={handleLogout}>
                                Log Out
                            </Link>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </li>
                    <li>
                        <Link to="/users">Sign Up</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;