import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

function SpotReview() {
    const reviews = useSelector(state => state.spots.reviews);
    const sessionUser = useSelector(state => state.session.user);
    const userReview = reviews.find((review) => (
        review.id === sessionUser.id
    ));
    console.log(sessionUser.id, '#######3', reviews, '@@@@@@@@@@');
    return (
        <>
            {reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((review) => (
                <div>
                    <h3>{review.User.firstName}</h3>
                    <span>{review.createdAt.slice(5, 7)} {review.createdAt.slice(0, 4)}</span>
                    <p>{review.review}</p>
                    {review.userId == sessionUser.id && (
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={
                                <DeleteReviewModal
                                    reviewId={review.id}
                                    spotId={review.spotId} />
                            } />
                    )}
                </div>
            ))}
        </>
    );
}

export default SpotReview;
