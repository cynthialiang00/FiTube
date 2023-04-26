import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { thunkEditComment } from '../../store/comments';
import { useEditCommentContext } from '../../context/EditContext';

import './Card.css';

const EditComment = ({ user, text, commentId }) => {
    const dispatch = useDispatch();

    const { setIsEditComment, setEditCommentId } = useEditCommentContext();
    const [commentContent, setCommentContent] = useState(text);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors({});
        const err = {};
        if (!commentContent.length) err["comment"] = "Comment must not be empty";
        if (commentContent && commentContent.length > 250) err["comment"] = "Comment exceeds the 250 character limit";
        setErrors(err)
    }, [commentContent])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).length) return alert(`${errors["comment"]}`);

        const commentForm = {};

        commentForm["content"] = commentContent;
        const editComment = dispatch(thunkEditComment(commentId, commentForm));
        const editCommentInfo = await editComment;

        if (editCommentInfo.errors) return alert(`${editCommentInfo.errors[0]}`);
        setIsEditComment(false);
        setEditCommentId(null);
    }

    const handleResetEditState = (e) => {
        e.preventDefault();
        setIsEditComment(false);
        setEditCommentId(null);
    }

    return (
        <div className="video-post-comment">
            <div className='post-comment-card'>
                <img className="post-comment-img" src={user.avatar} alt={`${user.name}'s avatar`}></img>
                <textarea
                    style={{ resize: "none" }}
                    className="comment-field"
                    placeholder="Add a comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                >
                </textarea>
                {Object.values(errors).length ?
                    <p className="comment-characters-invalid">{commentContent.length}/250</p>
                    :
                    <p className="comment-characters">{commentContent.length}/250</p>
                }
                <button
                    className="comment-cancel-button"
                    onClick={handleResetEditState}
                >
                    Cancel
                </button>
                <button
                    className="comment-post-button"
                    disabled={commentContent === text || Object.values(errors).length}
                    onClick={handleSubmit}
                >
                    Edit
                </button>
            </div>
        </div>
    )

};

export default EditComment;
