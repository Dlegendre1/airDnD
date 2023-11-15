import { useSelector } from "react-redux";
import CreateSpotButton from "../CreateSpotButton";
import SpotCard from "../SpotCardList/SpotCard";
import { Link } from "react-router-dom";

function UserSpots() {
    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots);

    const userSpots = spot.spots.filter((spot) => spot.ownerId === user.id);

    return (
        <>
            <h2>Manage Your Spots</h2>
            <CreateSpotButton />
            {userSpots.map((spot) => (
                <div>
                    <Link to={`/spots/${spot.id}`}>
                        <SpotCard spot={spot} />
                    </Link>
                    <div>
                        <Link to={`/spots/${spot.id}/edit`}>
                            <button>Update</button>
                        </Link>

                        <button>Delete</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default UserSpots;
