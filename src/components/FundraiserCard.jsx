import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
    const { fundraiserData } = props;

    return (
        <div className="fundraiser-card">
            <Link to="/fundraiser">
                <img src={https://static.vecteezy.com/system/resources/thumbnails/051/043/331/small_2x/kids-drawing-illustration-collection-of-cute-children-s-drawings-of-kids-animals-nature-objects-hand-drawn-doodle-color-pencil-naive-sketch-children-cute-school-chalk-background-vector.jpg} />
                <h3>{fundraiserData.title}</h3>
            </Link>
        </div>
    );
}

export default FundraiserCard;