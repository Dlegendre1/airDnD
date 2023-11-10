import { csrfFetch } from "./csrf";

const SET_REVIEWS = "reviews/setReviews";

const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        payload: reviews
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


const initialState = { reviews: [] };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_REVIEWS:
            newState = Object.assign({}, state);
            newState.spots = action.payload.Reviews;
            return newState;

        default:
            return state;
    }
};

export default reviewsReducer;
