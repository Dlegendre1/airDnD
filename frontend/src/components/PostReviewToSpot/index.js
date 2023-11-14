import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useHistory } from "react-router-dom";
import './index.css';

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
                    <div className="rating">
                        <label>
                            <input type="radio" name="stars" value="1" />
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="2" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="3" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="4" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="stars" value="5" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                    </div>
                </label>
                <button type="submit">Submit Your Review</button>
            </form>
        </>
    );
}

export default PostReviewToSpot;
