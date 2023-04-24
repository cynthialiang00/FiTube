// constants
const GET_ALL_VIDEOS = "videos/GET_ALL_VIDEOS";
const GET_ONE_VIDEO = "videos/GET_ONE_VIDEO";
const GET_USER_VIDEOS = "videos/GET_USER_VIDEOS";
const POST_VIDEO = "videos/POST_VIDEO";
const EDIT_VIDEO = "videos/EDIT_VIDEO";
const DELETE_VIDEO = "videos/DELETE_VIDEO";

const getAllVideos = (data) => ({
    type: GET_ALL_VIDEOS,
    payload: data
});

const getOneVideo = (data) => ({
    type: GET_ONE_VIDEO,
    payload: data
});

const getUserVideos = (data) => ({
    type: GET_USER_VIDEOS,
    payload: data
});

const postVideo = (data) => ({
    type: POST_VIDEO,
    payload: data
});

const editVideo = (data) => ({
    type: EDIT_VIDEO,
    payload: data
})

const deleteVideo = (id) => ({
    type: DELETE_VIDEO,
    id
})

const initialState = { all_videos: {},  one_video: {}, user_videos:{}};

export const thunkGetAllVideos = () => async (dispatch) => {
    const response = await fetch("/api/videos/");
    
    if (response.ok) {
        const data = await response.json();
        
        if (data.errors) {
            return data;
        }

        dispatch(getAllVideos(data));
    }
};

export const thunkGetOneVideo = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}`);

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(getOneVideo(data));
    }
};

export const thunkGetUserVideos = () => async (dispatch) => {
    const response = await fetch("/api/videos/user");

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(getUserVideos(data));
    }
};

export const thunkPostVideo = (video) => async (dispatch) => {
    const response = await fetch(`/api/videos/`, {
        method: 'POST',
        body: video
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(postVideo(data));
        return data;
    }
};

export const thunkEditVideo = (id, video) => async (dispatch) => {
    const response = await fetch(`/api/videos/${id}`, {
        method: 'PUT',
        body: video
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(editVideo(data));
        return data;
    }
};

export const thunkDeleteVideo = (id) => async (dispatch) => {
    const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(deleteVideo(id));
        return data;
    }
};



export default function videoReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_VIDEOS:
            newState = { ...state, all_videos: {} };
            action.payload.all_videos.forEach((video) => {
                newState.all_videos[video.id] = video
            });
            return newState;
        case GET_ONE_VIDEO:
            newState = { ...state, one_video: {} };
            action.payload.one_video.forEach((video) => {
                newState.one_video[video.id] = video
            });
            return newState;
        case GET_USER_VIDEOS:
            newState = { ...state, user_videos: {} };
            action.payload.user_videos.forEach((video) => {
                newState.user_videos[video.id] = video
            });
            return newState;
        case POST_VIDEO:
            newState = {...state};
            newState.all_videos = {...state.all_videos};
            newState.all_videos[action.payload.id] = action.payload;
            return newState;
        case EDIT_VIDEO:
            newState = { ...state };
            newState.all_videos = { ...state.all_videos };
            newState.all_videos[action.payload.id] = action.payload;
            newState.user_videos = {...state.user_videos};
            newState.user_videos[action.payload.id] = action.payload;
            return newState;
        case DELETE_VIDEO:
            newState = { ...state }
            newState.all_videos = { ...state.all_videos };
            delete newState.all_videos[action.id];
            newState.user_videos = { ...state.user_videos };
            delete newState.user_videos[action.id];
            // newState.one_video = { ...state.one_video };
            // delete newState.one_video[action.id];
            return newState;
        default:
            return state;
    }
}