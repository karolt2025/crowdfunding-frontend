
import FundraiserCard from "../components/FundraiserCard";
import useFundraisers from "../hooks/use-fundraisers.js";
import "./HomePage.css";

function HomePage() {
    const {fundraisers} = useFundraisers();

    return (
        <div id="fundraiser-list">
            {fundraisers.map((fundraiserData, key) => {
                return <FundraiserCard key={fundraiserData.id} fundraiserData={fundraiserData} />;
            })}
        </div>
    );
}

export default HomePage;