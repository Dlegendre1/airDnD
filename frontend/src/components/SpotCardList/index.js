import SpotCard from "./SpotCard";

function SpotCardList({ spots }) {

    return (
        <>
            {spots.map((spot) => (
                <SpotCard spot={spot} />
            ))}
        </>
    );

};

export default SpotCardList;
