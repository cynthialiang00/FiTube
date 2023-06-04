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

export const thunkSubscribe = (userId) => async (dispatch) => {
    const response = await fetch(`/api/subscribe/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(subChannel(data));
    }
};

export const thunkUnSubscribe = (userId) => async (dispatch) => {
    const response = await fetch(`/api/subscribe/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data;
        }

        dispatch(unsubChannel(data));
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
        case SUBSCRIBE_CHANNEL:
            newState = {...state};
            newState.channelUser.num_subscribers = {};
            newState.channelUser.is_subscribed_to = {};
            newState.channelUser.num_subscribers = action.payload.user.num_subscribers;
            newState.channelUser.is_subscribed_to = true;
            return newState;
        case UNSUBSCRIBE_CHANNEL:
            newState = { ...state };
            newState.channelUser.num_subscribers = {};
            delete newState.channelUser.is_subscribed_to;
            newState.channelUser.num_subscribers = action.payload.user.num_subscribers;
            return newState;
        default:
            return state;
    }
}