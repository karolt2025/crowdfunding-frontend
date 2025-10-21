import { useState } from "react";
import postSignup from "../api/post-signup.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function SignupForm() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            try {
                const response = await postSignup(credentials.username, credentials.password);
                console.log("Signup successful:", response);

                setAuth({ token: response.token });
                window.localStorage.setItem("token", response.token);
                navigate("/");
            } catch (error) {
                console.error("Signup failed:", error);
            }
        }



        // if (credentials.username && credentials.password) {
        //     postSignup(
        //         credentials.username,
        //         credentials.password
        //     ).then((response) => {
        //         console.log("Signup successful:", response);
        //     }); //.catch((error) => {
        //     console.error("Signup failed:", error);
        // });
    }


return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Sign Up
        </button>
    </form>
);
};

export default SignupForm;