// constants
const GET_ALL_CMTS = "comments/GET_ALL_CMTS";


const getAllComments = (data) => ({
    type: GET_ALL_CMTS,
    payload: data
});


const initialState = {};

export const thunkGetAllComments = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/comments`);

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(getAllComments(data));
    }
};

export default function commentReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_CMTS:
            newState = {};
            action.payload.video_comments.forEach((cmt) => {
                newState[cmt.id] = cmt
            });
            return newState;
        default:
            return state;
    }
}