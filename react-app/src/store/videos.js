// constants
const GET_ALL_VIDEOS = "videos/GET_ALL_VIDEOS";
const GET_ONE_VIDEO = "videos/GET_ONE_VIDEO";

const getAllVideos = (data) => ({
    type: GET_ALL_VIDEOS,
    payload: data
});

const getOneVideo = (data) => ({
    type: GET_ONE_VIDEO,
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
        
        default:
            return state;
    }
}