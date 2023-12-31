import { useSelector, useDispatch } from "react-redux";
import CreateSpotButton from "../CreateSpotButton";
import SpotCard from "../SpotCardList/SpotCard";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import { useState, useEffect } from "react";
import { fetchSpotsFromAPI } from "../../store/spots";
import './index.css';

function UserSpots() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchSpotsFromAPI());
    }, [dispatch]);

    const userSpots = spot.spots.filter((spot) => spot.ownerId === user.id);

    return (
        <div>
            <div>
                <h2>Manage Your Spots</h2>
                <div className="users-spot-create-spot-button">
                    <li className="create-spot-button-li">
                        <CreateSpotButton />
                    </li>
                </div>
            </div>
            <div className="user-spot-page">
                {userSpots.map((spot) => (
                    <div key={spot.id}>
                        <Link to={`/spots/${spot.id}`}>
                            <SpotCard spot={spot} />
                        </Link>
                        <div className="update-button">
                            <Link to={`/spots/${spot.id}/edit`}>
                                <button>Update</button>
                            </Link>
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={
                                    <DeleteSpotModal
                                        spotId={spot.id}
                                    />
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserSpots;
