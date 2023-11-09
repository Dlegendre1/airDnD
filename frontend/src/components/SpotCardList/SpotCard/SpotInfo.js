function SpotInfo({ spot }) {
    const { city, state, avgRating, price } = spot;


    return (
        <>
            <div>
                <div className="city-state">
                    {city}, {state}
                </div>
                <div className="avgRating">
                    {avgRating}
                </div>
            </div>
            <div className="price">
                ${price} night
            </div>
        </>
    );
};

export default SpotInfo;
