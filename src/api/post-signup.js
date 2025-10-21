async function postSignup(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const loginUrl = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    // const token = window.localStorage.getItem("token");

    //1. Sign up
    const response = await fetch(url, {
        method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to signup`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    //2. Login after signup
    const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!loginResponse.ok) {
        const fallbackError = `Signup worked, but login failed.`;

        const data = await loginResponse.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.non_field_errors?.[0] ?? fallbackError;
        throw new Error(errorMessage);
    }

    const loginData = await loginResponse.json();

    // 3. Store token in localStorage or AsyncStorage (for React Native)
    // In React Native, use AsyncStorage instead:
    // await AsyncStorage.setItem('token', loginData.token);
    localStorage.setItem("token", loginData.token);

    return loginData; // Contains token, user_id, email
}



// return await response.json();

export default postSignup;