import { csrfFetch } from "./csrf";

//action type
const SET_SPOTS = "spots/setSpots";
const ADD_SPOT = "spots/addSpot";
const SET_SPOT_DETAILS = "spots/setSpotDetails";
const SET_REVIEWS = "spots/setReviews";

//action
const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    };
};

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        payload: spot
    };
};

const setSpotDetails = (spot) => {
    return {
        type: SET_SPOT_DETAILS,
        payload: spot
    };
};

const setReviews = (spot) => {
    return {
        type: SET_REVIEWS,
        payload: spot
    };
};

//step 1
export const fetchSpotsFromAPI = () => async (dispatch) => {
    //step 2
    const response = await csrfFetch("/api/spots", {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        //step 3
        dispatch(setSpots(data));
    }
    return response;
};

export const fetchSpotDetailsFromAPI = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        //step 3
        dispatch(setSpotDetails(data));
    }
    return response;
};

export const postNewSpot = (spot, spotImage) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        body: JSON.stringify(
            spot
        )
    });
    if (response.ok) {
        const data = await response.json();
        addSpotImage(spotImage, data.id);
        return data;
    }
    return response;
};

export const addSpotImage = async (spotImage, spotId) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify(
            spotImage
        )
    });
    const data = await response.json();
    return data;
};

export const getSpotReviewsFromAPI = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setReviews(data));
    }
    return response;
};

const initialState = { spots: [], spotDetails: {}, reviews: [] };



//listener for actions
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        //step 4
        case SET_SPOTS:
            //step 5
            newState = Object.assign({}, state);
            newState.spots = action.payload.Spots;
            return newState;

        case ADD_SPOT:
            newState = Object.assign({}, state);
            newState.spots = [...state.spots, action.payload.spot];
            return newState;

        case SET_SPOT_DETAILS:
            newState = Object.assign({}, state);
            newState.spotDetails = action.payload;
            return newState;

        case SET_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = action.payload.Reviews;
            return newState;

        default:
            return state;
    }
};

export default spotsReducer;
