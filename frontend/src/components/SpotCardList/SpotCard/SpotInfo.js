import './SpotCard.css';

function SpotInfo({ spot }) {
    const { city, state, avgRating, price } = spot;


    return (
        <>
            <div className='city-state and avgRating container'>
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
