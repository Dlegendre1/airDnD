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
                    <i className="fa-solid fa-star"></i>
                    {avgRating ? avgRating : <span>New</span>}
                </div>
            </div>
            <div className="price">
                ${price} night
            </div>
        </>
    );
};

export default SpotInfo;
