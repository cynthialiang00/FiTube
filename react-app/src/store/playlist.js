const GET_PLAYLIST_VIDEOS = "playlists/GET_PLAYLIST_VIDEOS";
const GET_USER_PLAYLISTS = "playlists/GET_USER_PLAYLISTS";
const ADD_VIDEO_TO_PLAYLIST = "playlists/ADD_VIDEO_TO_PLAYLIST";
const DELETE_VIDEO_FROM_PLAYLIST = "playlists/DELETE_VIDEO_FROM_PLAYLIST";

const getPlaylistVideos = (data) => ({
    type: GET_PLAYLIST_VIDEOS,
    payload: data
});

const getPlaylists = (data) => ({
    type: GET_USER_PLAYLISTS,
    payload: data
});

const addVideoToPlaylist = (data, playlistId) => ({
    type: ADD_VIDEO_TO_PLAYLIST,
    payload: {data: data, playlistId: playlistId}
});

const deleteVideoFromPlaylist = (data, playlistId, videoId) => ({
    type: DELETE_VIDEO_FROM_PLAYLIST,
    payload: { data: data, playlistId: playlistId, videoId: videoId }
});


export const thunkGetPlaylistVideos = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`);

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(getPlaylistVideos(data));
    }
};

export const thunkGetPlaylists = () => async (dispatch) => {
    const response = await fetch("/api/playlists/");

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(getPlaylists(data));
    }
};

export const thunkAddVideoToPlaylist = (playlistId, videoId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/${videoId}`, {
        method: 'POST'
    });

        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(addVideoToPlaylist(data, playlistId));
        return data;

};

export const thunkDeleteVideoFromPlaylist = (playlistId, videoId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/${videoId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (data.errors) {
        return data;
    }

    dispatch(deleteVideoFromPlaylist(data, playlistId, videoId));
    return data;

};


const initialState = { playlist_id: {}, playlist_title: {}, playlist_owner: {}, playlist_owner_id: {}, playlist_videos: {}, user_playlists: {} };

export default function playlistReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_PLAYLIST_VIDEOS:
            newState = { ...state, playlist_id: {}, playlist_title: {}, playlist_owner: {}, playlist_videos: {} };
            action.payload.playlist_videos.forEach((video) => {
                newState.playlist_videos[video.id] = video;
            });
            newState.playlist_id = action.payload.playlist_id;
            newState.playlist_title = action.payload.playlist_title;
            newState.playlist_owner = action.payload.playlist_owner;
            newState.playlist_owner_id = action.payload.playlist_owner_id;
            return newState;
        case GET_USER_PLAYLISTS:
            newState = {...state, user_playlists: {}};
            action.payload.user_playlists.forEach((playlist) => {
                newState.user_playlists[playlist.id] = playlist;
            });
            return newState;
        case ADD_VIDEO_TO_PLAYLIST:
            if (state.playlist_id && state.playlist_id === action.payload.playlistId) {
                newState = {...state, playlist_videos:{...state.playlist_videos} };
                newState.playlist_videos[action.payload.data.playlist_add_video.id] = action.payload.data.playlist_add_video;
                return newState;
            }
            return state;
        case DELETE_VIDEO_FROM_PLAYLIST:
            if (state.playlist_id && state.playlist_id === action.payload.playlistId) {
                newState = { ...state, playlist_videos: { ...state.playlist_videos } };
                delete newState.playlist_videos[action.payload.videoId];
                return newState;
            }
            return state;
        default:
            return state;
    }
}