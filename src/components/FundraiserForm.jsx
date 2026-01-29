import { useState } from "react";
import postFundraiser from "../api/post-fundraiser.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function FundraiserForm() {
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
                const response = await postFundraiser(credentials.username, credentials.password);
                console.log("Signup successful:", response);

                setAuth({ token: response.token });
                window.localStorage.setItem("token", response.token);
                navigate("/");
            } catch (error) {
                console.error("Signup failed:", error);
            }
        }



        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                    owner="owner",
                    title="Enter title",
                    description="Enter description",
                    is_open="true",
                    deadline="Enter deadline",
                    goal_amount="Enter goal amount",
                    item_name="Enter items needed",
                    price="Enter price per item",
                    quantity_needed="Enter quantity needed",
                    // "external_url": null,
                    image="Attach image URL here"
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
                    Submit
                </button>
            </form>
        );
    };

    export default SignupForm;