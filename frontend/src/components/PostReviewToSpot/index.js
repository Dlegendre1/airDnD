import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useHistory } from "react-router-dom";

function PostReviewToSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const spotDetails = useSelector(state => state.spots.spotDetails);
    const spotId = spotDetails.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(spotActions.addReviewToSpot(review, stars, spotId))
            .then((spot) => {
                history.push(`/spots/${spot.spotId}`);
            });
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    How was your stay?
                    <input
                        type="textarea"
                        value={review}
                        placeholder="Leave your review here..."
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Stars
                    <input
                        type="radio"
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit Your Review</button>
            </form>
        </>
    );
}

export default PostReviewToSpot;
