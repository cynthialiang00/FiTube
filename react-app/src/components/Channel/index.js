import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetChannel, thunkSubscribe, thunkUnSubscribe } from "../../store/channels";
import ChannelTabs from "../ChannelTabs";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import './channel.css'


import numberFormat from "../../helperFuncs/numberFormat";


function Channel({user}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();

    const userDetails = useSelector((state) => state.channel.channelUser);
    const userVideos = useSelector((state) => state.channel.channelVideos);
    const userPlaylists = useSelector((state) => state.channel.channelPlaylists);

    const [isEditingChannel, setIsEditingChannel] = useState(false);

    

    useEffect(() => {
        dispatch(thunkGetChannel(userId));
    }, [dispatch, userId]);

    const clickSub = async (e, userId) => {
        e.preventDefault();
        if (!user) {
            return history.push({
                pathname: "/login",
                state: { goBackURL: history.location.pathname }
            });
        }
        await dispatch(thunkSubscribe(userId));
        return;
    }

    const clickUnSub = async (e) => {
        e.preventDefault();
        await dispatch(thunkUnSubscribe(userId));
        return;
    }

    const clickEditChannel = (e) => {
        e.preventDefault();
        setIsEditingChannel(!isEditingChannel);
        return;
    }
    

    console.log("USER DETAILS: ", userDetails);
    console.log("USER VIDEOS: ", userVideos);
    console.log("USER PLAYLIST: ", userPlaylists);

    console.log("EDITING? ", isEditingChannel);

    const userVideosArr = Object.values(userVideos);

    return (
        <>  
            
            <div className="channel-content-wrapper">
                {   userDetails.banner ? 
                    <div className="content-banner">
                        <img src={userDetails.banner} alt="banner"></img>
                        {user && userDetails.id === user.id && isEditingChannel ?
                            <button>
                                <i className="fa-solid fa-pen-to-square" style={{color: "#f1f1f1"}}></i>
                            </button>
                            :
                            null
                        }
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
                            
                            {   user && userDetails.id === user.id && isEditingChannel ?
                                    <div id="customize-btns">
                                        <button onClick={clickEditChannel}
                                                id="customizing-btn">
                                                    Customizing...
                                        </button>
                                    </div>
                                :
                                user && userDetails.id === user.id ?
                                    <div id="customize-btns">
                                        <button onClick={clickEditChannel}>Customize channel</button>
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
                                    <button id="subscribe-btn"
                                        onClick={(e) => clickSub(e, userDetails.id)} 
                                    >Subscribe</button>
                            }
                            
                            
                            
                            
                        </div>
                    </div>
                    
                </div>
                <ChannelTabs 
                    userDetails={userDetails} 
                    userVideos={userVideos} 
                    userPlaylists={userPlaylists}
                />
            </div>
            
        </>
    );
}

export default Channel;
