import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpotDetailsFromAPI, getSpotReviewsFromAPI } from "../../store/spots";
import ReviewInfo from "../ReviewInfo";
import SpotReview from "../SpotReview";
import OpenModalButton from "../OpenModalButton";
import PostReviewToSpot from "../PostReviewToSpot";

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
            <div>
                <h2>{spot.name}</h2>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div>
                <div>
                    <img src={mainImage.url} alt="main image" width={1000} height={1000} />
                </div>
                {secondaryImages.length > 0 && (
                    <div>
                        {secondaryImages.map((image) => (
                            <img src={image.url} />
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                <p>{spot.description}</p>
            </div>
            <div>
                <section>${spot.price} night</section>
                <ReviewInfo spot={spot} reviews={reviews} />
                <button onClick={() => alert('Feature coming soon')}>Reserve</button>
            </div>
            <hr></hr>
            <div>
                <div>
                    <ReviewInfo spot={spot} reviews={reviews} />
                </div>
                {sessionUser && sessionUser.id !== spot.Owner.id && !sessionUserReview && (
                    <>
                        {areThereReviews && (
                            <OpenModalButton
                                buttonText={"Be the first to post a review!"}
                                modalComponent={<PostReviewToSpot />}
                            />
                        )}
                        {!areThereReviews && (
                            <OpenModalButton
                                buttonText={"Post Your Review"}
                                modalComponent={<PostReviewToSpot />}
                            />
                        )}
                    </>
                )}
                <div>
                    <SpotReview />
                </div>
            </div>
        </>
    );

}

export default SpotDetailsPage;
