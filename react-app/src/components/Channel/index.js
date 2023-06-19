import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetChannel, thunkSubscribe, thunkUnSubscribe } from "../../store/channels";
import { useParams } from "react-router-dom";
import './channel.css'


import numberFormat from "../../helperFuncs/numberFormat";


function Channel({user}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();

    const userDetails = useSelector((state) => state.channel.channelUser);
    const userVideos = useSelector((state) => state.channel.channelVideos);
    const userPlaylists = useSelector((state) => state.channel.channelPlaylists);

    useEffect(() => {
        dispatch(thunkGetChannel(userId));
    }, [dispatch, userId]);

    const clickLogIn = async (e) => {
        e.preventDefault();
        return history.push({
            pathname: "/login",
            state: { goBackURL: history.location.pathname }
        });
    }

    const clickSub = async (e) => {
        e.preventDefault();
        await dispatch(thunkSubscribe(userId));
        return;
    }

    const clickUnSub = async (e) => {
        e.preventDefault();
        await dispatch(thunkUnSubscribe(userId));
        return;
    }

    

    console.log("USER DETAILS: ", userDetails);
    console.log("USER VIDEOS: ", userVideos);
    console.log("USER PLAYLIST: ", userPlaylists);

    const userVideosArr = Object.values(userVideos);

    return (
        <>  
            
            <div className="channel-content-wrapper">
                {   userDetails.banner ? 
                    <div className="content-banner">
                        <img src={userDetails.banner} alt="banner"></img>
                    </div>
                    :
                    null
                }
                

                <div className="content-about-wrapper">
                    <div className="content-about">
                        <div className="content-about-avatar">
                            <img src={userDetails.avatar} alt="user avatar"></img>
                        </div>
                        <div className="content-about-details">
                            <div>{userDetails.username}</div>
                            <div>
                                <span>@{userDetails.username}</span>
                                <span>{userDetails.num_subscribers === 0 ?
                                        `No subscribers`
                                        :
                                        userDetails.num_subscribers === 1 ?
                                        `1 subscriber`
                                        :
                                        `${userDetails.num_subscribers} subscribers`}
                                </span>
                                <span>{userVideosArr.length > 0 ? 
                                        userVideosArr.length : `No`} videos
                                </span>
                            </div>
                            <div>{userDetails.description}</div>
                            
                            {   user && userDetails.id === user.id ?
                                    <div id="customize-btns">
                                        <button>Customize channel</button>
                                        <button>Manage videos</button>
                                    </div>
                                :
                                userDetails.is_subscribed_to ? 
                                    <button id="unsubscribe-btn"
                                            onClick={clickUnSub}
                                    >
                                        <i className="fa-regular fa-bell" style={{ color: "#ffffff" }}></i>
                                        Subscribed
                                    </button>
                                :
                                    <button id="subscribe-btn" onClick={clickSub}>Subscribe</button>
                            }
                            
                            
                            
                            
                        </div>
                    </div>
                    
                </div>
                <div className="content-featured"></div>
            </div>
            
        </>
    );
}

export default Channel;
