import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkPostComment } from '../../store/comments';

import './Card.css';

const CreateComment = ({user, videoId}) => {
    const dispatch = useDispatch();

    const [commentContent, setCommentContent] = useState("");
    const [showCharCount, setShowCharCount] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors({});
        const err = {};
        if(!commentContent.length) err["comment"]= "Comment must not be empty";
        if(commentContent && commentContent.length > 250) err["comment"]="Comment exceeds the 250 character limit";
        setErrors(err)
    }, [commentContent])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).length) return alert(`${errors["comment"]}`);

        const commentForm = {};

        commentForm["content"] = commentContent;
        const newComment = dispatch(thunkPostComment(videoId,commentForm));
        const newCommentInfo = await newComment;

        if (newCommentInfo.errors) return alert(`${newCommentInfo.errors[0]}`);
        setCommentContent("");
    }

    const handleCancel = (e) => {
        e.preventDefault();
        return setCommentContent("");
    }

    return (
        <div className="video-post-comment">
            <div className='post-comment-card'>
                <img className="post-comment-img" src={user.avatar} alt={`${user.name}'s avatar`}></img>
                <textarea 
                    onFocus={(e) => {
                        setShowCharCount(true);
                    }}
                    onBlur={(e) => {
                        setShowCharCount(false);
                    }}
                    style={{resize: "none"}}
                    className="comment-field"
                    placeholder="Add a comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                >
                </textarea>
                {showCharCount ? 
                    (
                        
                            Object.values(errors).length ?
                                <p className="comment-characters-invalid">{commentContent.length}/250</p>
                                :
                                <p className="comment-characters">{commentContent.length}/250</p>
                        
                    )
                    :
                    null
                }
                
                <button
                    className="comment-cancel-button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="comment-post-button"
                    disabled={Object.values(errors).length}
                    onClick={handleSubmit}
                >
                    Comment
                </button>
            </div>
        </div>
    )

};

export default CreateComment;
