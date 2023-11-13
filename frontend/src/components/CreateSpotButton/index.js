import CreateASpot from "../SpotCreationForm";
import { Link } from "react-router-dom";



function CreateSpotButton() {



    return (
        <Link to={`/spots/new`} >
            <button>Create a New Spot</button>
        </Link>
    );
}

export default CreateSpotButton;
