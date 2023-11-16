import { csrfFetch } from "./csrf";

const SET_REVIEWS = "reviews/setReviews";
const DELETE_REVIEW = 'reviews/deleteReview';

const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews
    };
};

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    };
};

export const fetchReviewFromAPI = () => async (dispatch) => {
    const response = await csrfFetch("/api/reviews", {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setReviews(data));
    }
    return response;
};

export const deleteAReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteReview(reviewId));
    }
    return response;
};


const initialState = { reviews: [], mostRecentlyDeletedId: '' };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_REVIEWS:
            newState = Object.assign({}, state);
            newState.spots = action.payload.Reviews;
            return newState;

        case DELETE_REVIEW:
            newState = Object.assign({}, state);
            newState.mostRecentlyDeletedId = action.payload;
            return newState;

        default:
            return state;
    }
};

export default reviewsReducer;
