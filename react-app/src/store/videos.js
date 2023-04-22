// constants
const GET_ALL_VIDEOS = "videos/GET_ALL_VIDEOS";
const GET_ONE_VIDEO = "videos/GET_ONE_VIDEO";
const POST_VIDEO = "videos/POST_VIDEO";

const getAllVideos = (data) => ({
    type: GET_ALL_VIDEOS,
    payload: data
});

const getOneVideo = (data) => ({
    type: GET_ONE_VIDEO,
    payload: data
});


const postVideo = (data) => ({
    type: POST_VIDEO,
    payload: data
});

const initialState = { all_videos: {},  one_video: {}};

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

export const thunkPostVideo = (video) => async (dispatch) => {
    console.log('thunk body:', video)
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
        case POST_VIDEO:
            newState = {...state};
            newState.all_videos = {...state.all_videos};
            newState.all_videos[action.payload.id] = action.payload;
            return newState;
        
        default:
            return state;
    }
}