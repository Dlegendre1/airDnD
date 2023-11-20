import SpotCard from "./SpotCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotsFromAPI } from "../../store/spots";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css';

function SpotCardList() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots);

    useEffect(() => {
        dispatch(fetchSpotsFromAPI());
    }, [dispatch]);


    return (
        <div className="spot-card-list">
            {spots.map((spot) => (
                <Link exact to={`/spots/${spot.id}`} >
                    <SpotCard spot={spot} />
                </Link>
            ))}
        </div>
    );

};

export default SpotCardList;
