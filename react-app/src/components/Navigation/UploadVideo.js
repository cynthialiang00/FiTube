import { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkPostVideo } from "../../store/videos";
import './UploadForm.css';

import noLoginImg from './emoji-tongue.svg';

const UploadVideoModal = () => {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [video, setVideo] = useState(null);
    const [videoIsLoading, setVideoIsLoading] = useState(false);

    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailIsLoading, setThumbnailIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const allowedFileTypes = 'pngjpgjpeg';

    useEffect(() => {
        setErrors({});
        const err = {};
        if (!video) err["video"] = "Video file is required.";
        if (!thumbnail) err["thumbnail"] = "Thumbnail file is required.";
        if (video && getFileType(video.name) !== "mp4") err["videoType"] = "Video must be .mp4";
        if (thumbnail && !allowedFileTypes.includes(getFileType(thumbnail.name))) err["thumbnailType"] = "Thumbnail must be .png, .jpg, or .jpeg";
        if (!title.length) err["title"] = "Title field must not be empty";
        if (title.length > 70) err["title"] = "Title can’t be longer than 70 characters."
        if (description.length > 1000) err["description"] = "Description can't be longer than 1000 characters "
        setErrors(err)
    }, [video, thumbnail, title, description]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('submitted');
        if (Object.values(errors).length) return alert(`Oops, something went wrong with uploading the video. Please try again.`);

        const formData = new FormData();

        formData.append("video", video);
        formData.append("thumbnail", thumbnail);
        formData.append("title", title);
        formData.append("description", description);
        // console.log('submit formdata:', formData.get("video"))

        setVideoIsLoading(true);
        setThumbnailIsLoading(true);

        const created = dispatch(thunkPostVideo(formData));
        const createdInfo = await created;
        setVideoIsLoading(false);
        setThumbnailIsLoading(false);

        if (createdInfo.errors) return alert(`Oops, something went wrong with uploading. Please try again.`);

        if (!Object.values(errors).length && !createdInfo.errors) {
            history.push('/');
            closeModal();
        }

    };

    const getFileType = (filename) => {
        return filename.split('.').pop()
    }

    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);
    }

    const updateThumbnail = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
    }

    if(!user) return (
        <div className="edit-modal-container">
            <img className="edit-modal-login-photo" 
                src={noLoginImg} 
                alt="not logged in"
            >
            </img>
            <div className="edit-modal-no-login">Please <NavLink to="/login" onClick={() => closeModal()}>log in</NavLink> to upload a video</div>
        </div>
    );
    return (
        <div className="edit-modal-container">
            <div className='edit-modal-header'>
                <div>&nbsp;</div>
                <div style={{ paddingLeft: "7px" }} className='edit-modal-title'>{`Upload Your Video`}</div>

                <button className="edit-modal-close-btn" onClick={() => closeModal()}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="edit-modal-form">

                <div className="edit-modal-form-box">
                    <ul style={{ paddingTop: '10px', margin: '2px 0px 15px 25px', color: 'red' }}>
                        {Object.values(errors).map((error, idx) => (
                            <li key={idx} className="edit-errors">
                                {error}
                            </li>
                        ))}
                    </ul>
                    <label style={{ paddingLeft: "7px" }}> Video File </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={updateVideo}
                    />
                    <label style={{ paddingLeft: "7px" }}> Thumbnail </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateThumbnail}
                    />
                    <label style={{ paddingLeft: "7px" }} htmlFor="title"> Video Title </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        placeholder="Add a video title"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>

                    <label style={{ paddingLeft: "7px" }} htmlFor="description"> Video Description (Optional) </label>
                    <input
                        type="textarea"
                        id="description"
                        placeholder="Add a video description!"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>


                </div>

                <div className="edit-modal-form-box">
                    <button
                        className="decorated-button-edit-channel"
                        disabled={Object.values(errors).length}
                        onClick={handleSubmit}
                    >
                        Upload new video
                    </button>
                    {(videoIsLoading) && <p> Video Uploading...</p>}
                    {(thumbnailIsLoading) && <p> Thumbnail Uploading...</p>}
                </div>


            </form>
        </div>
    )

};

export default UploadVideoModal;
