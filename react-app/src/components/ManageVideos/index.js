import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import './ManageVideos.css'

function ManageVideos() {

    return (
        <div className="manage-content">
            <div>
                <h2>Channel content</h2>
            </div>
            <div className="manage-columns">
                <div className="manage-video">Video</div>
                <div className="manage-edit">Edit</div>
                <div className="manage-delete">Delete</div>
                <div className="manage-date">Date</div>
                <div className="manage-views">Views</div>
                <div className="manage-comments">Comments</div>
                <div className="manage-likes">Likes (vs. dislikes)</div>
            </div>
        </div>
    )
}

export default ManageVideos;
