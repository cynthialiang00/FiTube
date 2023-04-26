// constants
const GET_ALL_CMTS = "comments/GET_ALL_CMTS";
const POST_CMT = "comments/POST_CMT";
const EDIT_CMT = "comments/EDIT_CMT";
const DEL_CMT = "comments/DEL_CMT";

const getAllComments = (data) => ({
    type: GET_ALL_CMTS,
    payload: data
});

const postComment = (data) => ({
    type: POST_CMT,
    payload: data
});

const editComment = (data) => ({
    type: EDIT_CMT,
    payload: data
})

const deleteComment = (commentId) => ({
    type: DEL_CMT,
    payload: commentId
})

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

export const thunkPostComment = (videoId, comment) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(postComment(data));
        return data;
    }
};

export const thunkEditComment = (commentId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(editComment(data));
        return data;
    }
};

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(deleteComment(commentId));
        return data;
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
        case POST_CMT:
            newState={...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_CMT:
            newState={...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DEL_CMT:
            newState={...state};
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}