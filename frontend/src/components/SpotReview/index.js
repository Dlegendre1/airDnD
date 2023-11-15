import { useSelector } from "react-redux";


function SpotReview() {
    const reviews = useSelector(state => state.spots.reviews);

    return (
        <>
            {reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((review) => (
                <div>
                    <h3>{review.User.firstName}</h3>
                    <span>{review.createdAt.slice(5, 7)} {review.createdAt.slice(0, 4)}</span>
                    <p>{review.review}</p>
                </div>
            ))}
        </>
    );
}

export default SpotReview;
