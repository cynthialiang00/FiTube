import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkEditVideo, thunkGetOneVideo } from "../../store/videos";
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player'
import './EditPage.css';

const EditVideoPage = () => {
    const { videoId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();

    // const userVideos = useSelector((state) => state.videos.user_videos);
    // const video = userVideos[videoId];

    const video = useSelector((state) => state.videos.one_video);

    useEffect(() => {
        dispatch(thunkGetOneVideo(videoId));
        setTitle(video.title);
        setDescription(video.description);
    }, [dispatch, videoId, video.title, video.description]);

    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailIsLoading, setThumbnailIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
            setErrors({});
            const err = {};
            if (title) {
                if (!title.length) err["title"] = "Title field must not be empty";
                if (title.length > 70) err["title"] = "Title can’t be longer than 70 characters."
            }
            if (description) {
                if (description.length > 1000) err["description"] = "Description can't be longer than 1000 characters "
            }
            setErrors(err)
        
    }, [title, description])

    console.log("VIDEO", video)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitted');
        console.log("ERRORS", errors)

        if (Object.values(errors).length) return alert(`Oops, something went wrong with uploading the video. Please try again.`);

        const formData = new FormData();

        if (thumbnail !== null) {
            formData.append("thumbnail", thumbnail);
            setThumbnailIsLoading(true);
        };
        if (title !== null) formData.append("title", title);
        if (description !== null) formData.append("description", description);

        console.log(formData.get('thumbnail'));
        console.log(formData.get('title'));
        console.log(formData.get('description'));
        

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

    return (
        <div className="edit-page">
            <div className="edit-page-left"></div>
            <div className="edit-page-content">
                <h1>Video Details</h1>
                
                <form className="edit-page-form">
                    <div className="edit-page-form-box">
                        <label style={{ paddingLeft: "7px" }} htmlFor="title"> Title </label>
                        <input
                            type="textarea"
                            id="title"
                            value={title}
                            placeholder="Add a video title"
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className="edit-page-form-box">
                        <label style={{ paddingLeft: "7px" }} htmlFor="description"> Description</label>
                        <textarea
                            id="description"
                            placeholder="Add a video description!"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <label style={{ paddingLeft: "7px" }} id="thumbnail-label"> Thumbnail </label>
                    <div id="thumbnail-instructions">Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateThumbnail}
                    />
                </form>


            </div>
            <div className="edit-page-utils">
                <div className="edit-page-utils-header">
                    <button 
                        className="edit-page-decorated-button"
                        disabled={(title === video.title && description === video.description && !thumbnail) 
                            || Object.values(errors).length}
                        onClick={handleSubmit}
                    >
                        SAVE
                    </button>
                </div>
                <div className="edit-page-utils-video">
                    <ReactPlayer 
                        height="198px"
                        width="352px"
                        controls={true}
                        url={video.url}
                    />
                    <p>Video Link</p>
                    <NavLink to="/">Link goes here</NavLink>
                </div>
            </div>
            <div className="edit-page-right"></div>

        </div>
    )

};

export default EditVideoPage;
