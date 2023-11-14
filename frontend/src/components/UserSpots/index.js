import { useSelector } from "react-redux";
import CreateSpotButton from "../CreateSpotButton";
import SpotCard from "../SpotCardList/SpotCard";

function UserSpots() {
    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots);

    console.log("!!!!!!!!!!!!!!!!!!", user);
    console.log("??????????????????", spot);

    const userSpots = spot.spots.filter((spot) => spot.ownerId === user.id);

    console.log("@@@@@@@@@@@@", userSpots);

    return (
        <>
            <h2>Manage Your Spots</h2>
            <CreateSpotButton />
            {userSpots.map((spot) => (
                <SpotCard spot={spot} />

            ))}
        </>
    );
}

export default UserSpots;
