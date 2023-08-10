import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkEditVideo, thunkGetOneVideo } from "../../store/videos";
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player'
import './EditPage.css';

import forbiddenImg from '../Forbidden/forbidden.svg';
import noLoginImg from '../Navigation/emoji-tongue.svg';
import loadSpin from '../../assets/Pulse-1.3s-200px (1).svg';

const EditVideoPage = ({user}) => {
    const { videoId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();

    // const userVideos = useSelector((state) => state.videos.user_videos);
    // const video = userVideos[videoId];

    const video = useSelector((state) => state.videos.one_video);

    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailIsLoading, setThumbnailIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hasSubmit, setHasSubmit] = useState(false);
    const [errors, setErrors] = useState({});

    const [isContentLoading, setIsContentLoading] = useState(true);

    useEffect(() => {
        dispatch(thunkGetOneVideo(videoId))
                .then((res) => (setIsContentLoading(false)));
        setTitle(video.title);
        setDescription(video.description);
    }, [dispatch, videoId, video.title, video.description]);

    useEffect(() => {
            setErrors({});
            const err = {};
            if (!title) err["title"] = "Title field must not be empty";
            if (title && title.length > 70) err["title"] = "Title can’t be longer than 70 characters.";
            if (description &&description.length > 1000) err["description"] = "Description can't be longer than 1000 characters";
            setErrors(err)
        
    }, [title, description])


    const clickLogIn = async (e) => {
        e.preventDefault();
        return history.push({
            pathname: "/login",
            state: { goBackURL: history.location.pathname }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmit(true);
        // console.log('submitted');
        // console.log("ERRORS", errors);

        if (Object.values(errors).length) return alert(`Oops, something went wrong with uploading the video. Please try again.`);

        const formData = new FormData();

        if (thumbnail !== null) {
            formData.append("thumbnail", thumbnail);
            setThumbnailIsLoading(true);
        };
        if (title !== null) formData.append("title", title);
        if (description !== null) formData.append("description", description);

        // console.log(formData.get('thumbnail'));
        // console.log(formData.get('title'));
        // console.log(formData.get('description'));
        

        const edited = dispatch(thunkEditVideo(videoId, formData));
        const editedInfo = await edited;
        setThumbnailIsLoading(false);

        if (editedInfo.errors) return alert(`Oops, something went wrong with uploading. Please try again.`);

        if (!Object.values(errors).length && !editedInfo.errors) {
            history.push('/manage');
        }

    };


    const updateThumbnail = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    }


    if (isContentLoading) {
        return (
            <div className="loading-spinner">
                <img src={loadSpin}
                    alt="loading"
                >
                </img>
            </div>
        )
    }

    if (!user) return (
        <>
            <div className="edit-not-allowed">
                <img className="edit-not-allowed-photo"
                    src={noLoginImg}
                    alt="not logged in"
                >
                </img>
                <div>You must <button onClick={clickLogIn}>Log In</button> to access this resource. </div>
            </div>
        </>
    );
    if (user && user.id !== video.user_id) return ( 
        <>
            <div className="edit-not-allowed">
                <img className="edit-not-allowed-photo"
                    src={forbiddenImg}
                    alt="not allowed"
                >
                </img>
                <div>You are not allowed to access this resource. Click <NavLink to="/manage">here</NavLink> to manage videos</div>

            </div>
        </>
    );
    return (
        <div className="edit-page">
            <div className="edit-page-left"></div>
            <div className="edit-page-content">
                
                <form className="edit-page-form">
                    <h1>Video Details</h1>
                    <div className="edit-page-form-box">
                        <label style={{ paddingLeft: "7px" }} htmlFor="title"> Title </label>
                        <input
                            type="textarea"
                            id="title"
                            value={title}
                            placeholder="Add a video title"
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                        {errors.title && (
                            <p className="edit-errors">* {errors.title}</p>
                        )}
                    </div>
                    <div className="edit-page-form-box">
                        <label style={{ paddingLeft: "7px" }} htmlFor="description"> Description</label>
                        <textarea
                            id="description"
                            placeholder="Add a video description!"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {errors.description && (
                            <p className="edit-errors">* {errors.description}</p>
                        )}
                    </div>
                    <label style={{ paddingLeft: "7px" }} id="thumbnail-label"> Thumbnail </label>
                    <div id="thumbnail-instructions">Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateThumbnail}
                    />
                </form>

                
                <div className="edit-page-utils">
                    <div className="edit-page-utils-header">
                        <button
                            className="edit-page-decorated-button"
                            disabled={(title === video.title && description === video.description && !thumbnail)
                                || Object.values(errors).length || hasSubmit}
                            onClick={handleSubmit}
                        >
                            SAVE
                        </button>
                    </div>
                    <div className="edit-page-utils-video">
                        <ReactPlayer
                            height="70%"
                            width="100%"
                            controls={true}
                            url={video.url}
                        />
                        <p>Video Link</p>
                        <NavLink to={`/videos/${video.id}`}>fitube.onrender.com/videos/{`${video.id}`}</NavLink>
                    </div>
                </div>
            </div>
            
            <div className="edit-page-right"></div>

        </div>
    )

};

export default EditVideoPage;
