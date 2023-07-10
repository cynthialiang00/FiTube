import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetChannel, thunkSubscribe, thunkUnSubscribe, thunkEditChannel } from "../../store/channels";
import ChannelTabs from "../ChannelTabs";
import { useParams } from "react-router-dom";
import loading from "./Rolling-1.3s-207px.svg";
import './channel.css'
import notFoundImg from '../Forbidden/404.svg';



import numberFormat from "../../helperFuncs/numberFormat";


function Channel({user}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();

    const userDetails = useSelector((state) => state.channel.channelUser);
    const userVideos = useSelector((state) => state.channel.channelVideos);
    const userPlaylists = useSelector((state) => state.channel.channelPlaylists);

    const [isEditingChannel, setIsEditingChannel] = useState(false);
    const [isAvatarLoading, setIsAvatarLoading] = useState(false);
    const [isBannerLoading, setIsBannerLoading] = useState(false);
    const [isEditingDescr, setIsEditingDescr] = useState(false);
    
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState({});
    const [is404, setIs404] = useState(false);
    

    useEffect(() => {
        const channelRes = dispatch(thunkGetChannel(userId))
                            .then((res) => (res))
                            .then((res) => {
                                if (res && res.errors) {
                                    return setIs404(true);
                                }
                                else
                                    return;
                            })

        setDescription(userDetails.description)
    }, [dispatch, userId, userDetails.description, user]);

    useEffect(() => {
        setErrors({});
        const err = {};
        if (description && description.length > 250) {
            err["description"] = "Description can't be longer than 250 characters.";
        } 
        setErrors(err);

    }, [description])

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
    const updateBanner = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("banner", file);

        setIsBannerLoading(true);

        const editedBanner = dispatch(thunkEditChannel(userDetails.id, formData));
        const editedInfo = await editedBanner;

        setIsBannerLoading(false);

        if (!editedInfo) return alert(`Oops, something went wrong with uploading. Please try again.`);
        return;
    }

    const updateAvatar = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("avatar", file);

        setIsAvatarLoading(true);

        const editedAvatar = dispatch(thunkEditChannel(userDetails.id, formData));
        const editedInfo = await editedAvatar;

        setIsAvatarLoading(false);

        if (!editedInfo) return alert(`Oops, something went wrong with uploading. Please try again.`);
        return;
        
    }

    const handleEditDescrMode = (e) => {
        e.preventDefault();
        setIsEditingDescr(true);
        return;
    }

    const handleDescrSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).length) return;

        const formData = new FormData();
        formData.append("description", description);


        const editedDescr = dispatch(thunkEditChannel(userDetails.id, formData));
        const editedInfo = await editedDescr;

        if (!editedInfo) return alert(`Oops, something went wrong with uploading. Please try again.`);

        setIsEditingDescr(false);
        return;

    }

    const handleDescrCancel = (e) => {
        e.preventDefault();
        setDescription(userDetails.description);
        setIsEditingDescr(false)
        return;
    }

    // console.log("USER DETAILS: ", userDetails);
    // console.log("USER VIDEOS: ", userVideos);
    // console.log("USER PLAYLIST: ", userPlaylists);

    // console.log("EDITING? ", isEditingChannel);
    // console.log("EDITING DESCR?", isEditingDescr);

    const userVideosArr = Object.values(userVideos);

    if (is404) {
        return (
            <>
                <div className="video-not-found">
                    <img className="video-not-found-photo"
                        src={notFoundImg}
                        alt="not allowed"
                    >
                    </img>
                    <div> 404: Resource not found. Click <NavLink to="/videos">here</NavLink> to go to the home page.</div>

                </div>
            </>
        );
    }
    return (
        <>  
            
            <div className="channel-content-wrapper">
                {   userDetails.banner ? 
                    <div className="content-banner">
                        <img src={userDetails.banner} alt="banner"></img>
                        {user && userDetails.id === user.id && isEditingChannel && isBannerLoading ?
                            <img id="banner-loading" src={loading} alt="loading-svg"></img>
                        
                        :
                        user && userDetails.id === user.id && isEditingChannel ?
                            <>
                                <label htmlFor="edit-banner-upload" className="channel-edit-btn" id="banner-edit">
                                    <i className="fa-solid fa-pen-to-square" style={{ color: "#aaaaaa" }}></i>
                                </label>
                                <input id="edit-banner-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={updateBanner}
                                />
                            </>
                            :
                            null
                        }
                        
                    </div>
                    : user && userDetails.id === user.id && isEditingChannel ?
                        <>
                            <div className="content-banner">
                                <div id="content-banner-none"></div>
                                { isBannerLoading ?
                                    <img id="banner-loading" src={loading} alt="loading-svg"></img>
                                :
                                    <>
                                        <label htmlFor="edit-banner-upload" className="channel-edit-btn" id="banner-edit">
                                            <i className="fa-solid fa-pen-to-square" style={{ color: "#aaaaaa" }}></i>
                                        </label>
                                        <input id="edit-banner-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={updateBanner}
                                        />
                                    </>
                                }
                            </div>
                            
                        </>
                    :
                    null
                }
                

                <div className="content-about-wrapper">
                    <div className="content-about">
                        <div className="content-about-avatar">
                            <img src={userDetails.avatar} alt="user avatar"></img>
                            {user && userDetails.id === user.id && isEditingChannel && isAvatarLoading ?
                                <img id="avatar-loading" src={loading} alt="loading-svg"></img>
                            :
                            user && userDetails.id === user.id && isEditingChannel ?
                                <>
                                    
                                    <label htmlFor="edit-avatar-upload" className="channel-edit-btn" id="avatar-edit">
                                        <i className="fa-solid fa-pen-to-square" style={{ color: "#aaaaaa" }}></i>
                                    </label>
                                    <input id="edit-avatar-upload"
                                            type="file" 
                                            accept="image/*"
                                            onChange={updateAvatar}
                                    />
                                </>
                                :
                                null
                            }
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
                            {
                                user && userDetails.id === user.id && isEditingChannel && isEditingDescr ?
                                    <div>
                                        <input type="textarea"
                                            id="description-edit-input"
                                            value={description}
                                            placeholder="Add a description"
                                            onChange={(e) => setDescription(e.target.value)}
                                        >
                                        </input>
                                        <div className="description-input-btn-wrapper">
                                            <button className="description-input-btn"
                                                onClick={handleDescrSubmit}
                                                disabled={description === userDetails.description || description.length > 250}
                                            >
                                                Confirm
                                            </button>
                                            <button className="description-input-btn"
                                                onClick={handleDescrCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                    </div>
                                :
                                    <div>{userDetails.description}</div>

                            }
                            
                            


                            {user && userDetails.id === user.id && isEditingChannel && !isEditingDescr ?
                                <button className="channel-edit-btn" id="description-edit"
                                        onClick={handleEditDescrMode}
                                >
                                    <i className="fa-solid fa-pen-to-square" style={{ color: "#aaaaaa" }}></i>
                                </button>
                                :
                                null
                            }
                            
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
                                        <NavLink to="/manage">
                                            <button>

                                                Manage videos


                                            </button>
                                        </NavLink>
                                        
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
