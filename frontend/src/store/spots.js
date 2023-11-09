import { csrfFetch } from "./csrf";

//action type
const SET_SPOTS = "spots/setSpots";

//action
const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
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

const initialState = { spots: [] };



//listener for actions
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        //step 4
        case SET_SPOTS:
            //step 5
            newState = Object.assign({}, state);
            newState.spots = action.payload;
            return newState;

        default:
            return state;
    }
};

export default spotsReducer;
