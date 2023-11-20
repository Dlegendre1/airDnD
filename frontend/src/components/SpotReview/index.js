import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

function SpotReview() {
    const reviews = useSelector(state => state.spots.reviews);
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser, '@@@@@@@@@@@@@@@');
    let sessionUserId;
    if (sessionUser) {
        sessionUserId = sessionUser.id;
    }
    return (
        <>
            {reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((review) => (
                <div>
                    <h3>{review.User.firstName}</h3>
                    <span>{review.createdAt.slice(5, 7)} {review.createdAt.slice(0, 4)}</span>
                    <p>{review.review}</p>
                    {review.User.id == sessionUserId && (
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
