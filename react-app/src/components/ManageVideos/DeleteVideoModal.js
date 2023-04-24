import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteVideo } from "../../store/videos";
import '../Navigation/ModalForm.css'

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
        <div className='edit-model'>
            <div className="edit-modal-container">
                <div className='edit-modal-header'>
                    <div>&nbsp;</div>
                    <div style={{ paddingLeft: "7px" }} className='edit-modal-title'>Delete This Video?</div>

                    <button className="edit-modal-close-btn" onClick={() => closeModal()}>
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>

                <div className="edit-modal-form-box">
                        <button
                            className="decorated-button-edit-channel"
                            onClick={handleDelete}
                        >
                            Delete this Video
                        </button>
                        <button
                            className="decorated-button-edit-channel"
                            onClick={() => closeModal()}
                        >
                            Nevermind
                        </button>
                </div>


            </div>
        </div>
    )

};

export default DeleteVideoModal;
