// constants
const GET_CHANNEL = "channels/GET_CHANNEL";
const SUBSCRIBE_CHANNEL = "channels/SUBSCRIBE_CHANNEL";
const UNSUBSCRIBE_CHANNEL = "channels/UNSUBSCRIBE_CHANNEL";

const getChannel = (data) => ({
    type: GET_CHANNEL,
    payload: data
});

const subChannel = (data) => ({
    type: SUBSCRIBE_CHANNEL,
    payload: data
});

const unsubChannel = (data) => ({
    type: UNSUBSCRIBE_CHANNEL,
    payload: data
})

const initialState = { channelUser: {}, channelVideos: {}, channelPlaylists: {}};

export const thunkGetChannel = (userId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${userId}`);

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(getChannel(data));
    }
};

export default function channelReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_CHANNEL:
            newState = {...state};
            newState.channelUser = action.payload.channel_user;
            action.payload.channel_playlists.forEach((playlist) => {
                newState.channelPlaylists[playlist.id] = playlist
            });
            action.payload.channel_videos.forEach((video) => {
                newState.channelVideos[video.id] = video
            });
            return newState;
        default:
            return state;
    }
}