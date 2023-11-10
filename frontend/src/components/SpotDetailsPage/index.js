import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



function SpotDetailsPage() {
    const { spotId } = useParams();


    const spotList = useSelector((state) => {
        return state.spots.spots.find((spot) => {
            if (spot.id === spotId) {
                return true;
            }
        });
    });


    const spot = spotList.find((spot) => {
        if (spot.id === spotId) {
            return true;
        }
    });

    const userId = spot.ownerId;


    return (
        <>
            <div>
                <h2>{spot.name}</h2>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div>
                <img src={spot.url} alt="main image" width={1000} height={1000} />
            </div>
            <div>
                <h2>Hosted by {user.firstName} {user.lastName}</h2>
            </div>
        </>
    );

}

export default SpotDetailsPage;
