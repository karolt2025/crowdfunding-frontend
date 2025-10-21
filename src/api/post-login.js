import AsyncStorage from '@react-native-async-storage/async-storage';

async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response = await fetch(url, {
        method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
        // method: "POST"
        // method: "PUT"
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //     "username": username,
        //     "password": password,
        // }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to login`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    const data = await response.json();

    await AsyncStorage.setItem('token', data.token);

    return data;

}

//     return await response.json();
// }

export default postLogin;