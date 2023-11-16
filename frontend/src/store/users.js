import { csrfFetch } from "./csrf";

const SET_USERS = "users/setUsers";

const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    };
};

export const fetchUsersFromAPI = () => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUsers(data));
    }
    return response;
};

const initialState = { users: [] };


const usersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USERS:
            newState = Object.assign({}, state);
            newState.users = action.payload.Users;
            return newState;

        default:
            return state;
    }
};

export default usersReducer;
