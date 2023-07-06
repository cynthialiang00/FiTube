const GET_PLAYLIST_VIDEOS = "playlists/GET_PLAYLIST_VIDEOS";

const getPlaylistVideos = (data) => ({
    type: GET_PLAYLIST_VIDEOS,
    payload: data
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

const initialState = { playlist_title: {}, playlist_owner: {}, playlist_videos: {} };

export default function playlistReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_PLAYLIST_VIDEOS:
            newState = { ...state, playlist_title: {}, playlist_owner: {}, playlist_videos: {} };
            action.payload.playlist_videos.forEach((video) => {
                newState.playlist_videos[video.id] = video;
            });
            newState.playlist_title = action.payload.playlist_title;
            newState.playlist_owner = action.payload.playlist_owner;
            return newState;
        default:
            return state;
    }
}