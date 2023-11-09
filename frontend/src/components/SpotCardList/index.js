import SpotCard from "./SpotCard";
import { useDispatch } from "react-redux";
import { fetchSpotsFromAPI } from "../../store/spots";
import { useEffect } from "react";

function SpotCardList({ spots }) {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchSpotsFromAPI());
    }, [dispatch]);


    return (
        <>
            {Object.values(spots).map((spot) => (
                <SpotCard spot={spot} />
            ))}
        </>
    );

};

export default SpotCardList;
