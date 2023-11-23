import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotDetailsFromAPI, getSpotReviewsFromAPI } from "../../store/spots";
import ReviewInfo from "../ReviewInfo";
import SpotReview from "../SpotReview";
import OpenModalButton from "../OpenModalButton";
import PostReviewToSpot from "../PostReviewToSpot";
import './index.css';

function SpotDetailsPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const mostRecentReview = useSelector(state => state.spots.mostRecentReview);
    const mostRecentlyDeletedId = useSelector(state => state.reviews.mostRecentlyDeletedId);
    const spot = useSelector((state) => {
        return state.spots.spotDetails;
    });

    const reviews = useSelector((state) => {
        return state.spots.reviews;
    });

    let areThereReviews;
    let sessionUserReview;

    useEffect(() => {
        dispatch(fetchSpotDetailsFromAPI(spotId));
        dispatch(getSpotReviewsFromAPI(spotId));
    }, [dispatch, mostRecentReview, mostRecentlyDeletedId]);


    if (!spot?.SpotImages) {
        return <div>Loading</div>;
    }
    const spotImages = spot.SpotImages;

    const mainImage = spotImages.find((image) => image.preview);
    const secondaryImages = spotImages.filter((image) => !image.preview);
    if (sessionUser) {
        areThereReviews = (sessionUser.id !== spot.Owner.id && reviews.length === 0);
        sessionUserReview = reviews.find((review) => (
            review.userId === sessionUser.id
        ));
    }

    return (
        <>
            <div className="spot-detail-header-area">
                <h2>{spot.name}</h2>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className="spot-detail-review-area">
                <div className="main-image">
                    <img src={mainImage.url} alt="main image" width={500} height={500} />
                </div>
                {secondaryImages.length > 0 && (
                    <div className="secondary-images">
                        {secondaryImages.map((image) => (
                            <img src={image.url} width={249} height={249} />
                        ))}
                    </div>
                )}
            </div>
            <div className="under-image-area">
                <div>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className="reserve-button-box">
                    <div className="reserve-button-price-review-info">
                        <section><span style={{ fontWeight: 'bold', fontSize: '20px', alignSelf: 'end' }}>${spot.price}</span> night</section>
                        <ReviewInfo spot={spot} reviews={reviews} />
                    </div>
                    <button className='reserve-button' onClick={() => alert('Feature coming soon')}>Reserve</button>
                </div>
            </div >
            <hr></hr>
            <div>
                <div className="review-info-square">
                    <ReviewInfo spot={spot} reviews={reviews} />
                </div>
                {sessionUser && sessionUser.id !== spot.Owner.id && !sessionUserReview && (
                    <div>
                        {areThereReviews && (
                            <li className="post-review-buttons">
                                <OpenModalButton
                                    buttonText={"Be the first to post a review!"}
                                    modalComponent={<PostReviewToSpot />}
                                />
                            </li>
                        )}
                        {!areThereReviews && (
                            <li className="post-review-buttons">
                                <OpenModalButton
                                    buttonText={"Post Your Review"}
                                    modalComponent={<PostReviewToSpot />}
                                />
                            </li>
                        )}
                    </div>
                )}
                <div>
                    <SpotReview />
                </div>
            </div>
        </>
    );

}

export default SpotDetailsPage;
