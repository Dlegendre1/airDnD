import { csrfFetch } from "./csrf";

//action type
const SET_SPOTS = "spots/setSpots";
const SET_SPOT_DETAILS = "spots/setSpotDetails";

//action
const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    };
};

const setSpotDetails = (spot) => {
    return {
        type: SET_SPOT_DETAILS,
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

const initialState = { spots: [], spotDetails: {} };



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

        case SET_SPOT_DETAILS:
            newState = Object.assign({}, state);
            newState.spotDetails = action.payload;
            return newState;

        default:
            return state;
    }
};

export default spotsReducer;
