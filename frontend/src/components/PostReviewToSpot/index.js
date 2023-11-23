import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useHistory } from "react-router-dom";
import './index.css';
import { useModal } from "../../context/Modal";

function PostReviewToSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const { closeModal } = useModal();
    const spotDetails = useSelector(state => state.spots.spotDetails);
    const spotId = spotDetails.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(spotActions.addReviewToSpot(review, stars, spotId))
            .then((spot) => {
                history.push(`/spots/${spot.spotId}`);
                closeModal();
                dispatch(spotActions.postReviewToSpot());
            });

    };

    const reviewLength = review.length < 10;
    const starsValue = stars;
    return (
        <div >
            <form className="post-review-form" onSubmit={handleSubmit}>
                <div className="full-review-area">
                    <label className="leave-review-area">
                        How was your stay?
                        <br></br>
                        <textarea
                            type="textarea"
                            value={review}
                            placeholder="Leave your review here..."
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <label className="full-rating-area">
                    <div className="rating">
                        <label>
                            <input type="radio" name="stars" value="1" onChange={(e) => setStars(e.target.value)} />
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="2" onChange={(e) => setStars(e.target.value)} />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="3" onChange={(e) => setStars(e.target.value)} />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="4" onChange={(e) => setStars(e.target.value)} />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="5" onChange={(e) => setStars(e.target.value)} />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                    </div>
                    <span>Stars</span>
                </label>
                <button className="submit-review-button" type="submit" disabled={reviewLength || !starsValue}>Submit Your Review</button>
            </form>
        </div>
    );
};

export default PostReviewToSpot;
