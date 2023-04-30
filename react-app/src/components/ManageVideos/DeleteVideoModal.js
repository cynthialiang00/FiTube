import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteVideo } from "../../store/videos";
import './DeleteVideo.css'

const DeleteVideoModal = ({videoId}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();



    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(thunkDeleteVideo(videoId));
        closeModal();
    };


    return (
        <div className='delete-modal'>
                <div className='delete-modal-header'>
                    <h2>Permanently delete this video?</h2>

                    <button className="delete-modal-close-btn" onClick={() => closeModal()}>
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>

                <div className='delete-modal-body'>
                    <p>Deleting is permanent and can't be undone.</p>
                </div>

                <div className="delete-modal-btns">
                        
                        <button
                            id="delete-modal-cancel"
                            onClick={() => closeModal()}
                        >
                            CANCEL
                        </button>

                        <button
                            id="delete-modal-delete"
                            onClick={handleDelete}
                        >
                            DELETE FOREVER
                        </button>
                </div>
        </div>
    )

};

export default DeleteVideoModal;
