import CreateASpot from "../SpotCreationForm";
import { Link } from "react-router-dom";
import './index.css';


function CreateSpotButton() {



    return (
        <Link to={`/spots/new`} >
            <button className="create-spot-button">Create a New Spot</button>
        </Link>
    );
}

export default CreateSpotButton;
