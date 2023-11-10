import SpotCard from "./SpotCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotsFromAPI } from "../../store/spots";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function SpotCardList() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots);

    useEffect(() => {
        dispatch(fetchSpotsFromAPI());
    }, [dispatch]);


    return (
        <>
            {spots.map((spot) => (
                <Link exact to={`/spots/${spot.id}`} >
                    <SpotCard spot={spot} />
                </Link>
            ))}
        </>
    );

};

export default SpotCardList;
