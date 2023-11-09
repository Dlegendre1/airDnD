


function SpotDetailsPage({ user, spot }) {






    return (
        <>
            <div>
                <h2>{spot.name}</h2>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div>
                <img src={spot.url} alt="main image" width={1000} height={1000} />
            </div>
            <div>
                <h2>Hosted by {user.firstName} {user.lastName}</h2>
            </div>
        </>
    );

}
