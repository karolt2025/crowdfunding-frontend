import { useState, useEffect } from 'react';
import getFundraisers from "../api/get-fundraisers.js";

export default function useFundraisers() {
    const [fundraisers, setFundraisers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getFundraisers().then((fundraisers) => {
            setFundraisers(fundraisers);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return {fundraisers, isLoading, error};


}

