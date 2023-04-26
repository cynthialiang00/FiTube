import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkDeleteComment } from "../../../store/comments";
import '../../Navigation/ModalForm.css'

const DeleteCommentModal = ({ commentId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(thunkDeleteComment(commentId));
        closeModal();
    };


    return (
        <div className='edit-model'>
            <div className="edit-modal-container">
                <div className='edit-modal-header'>
                    <div>&nbsp;</div>
                    <div style={{ paddingLeft: "7px" }} className='edit-modal-title'>
                        Delete This Comment?
                        (THIS MODAL WILL BE STYLED MORE BEFORE CAPSTONE IS DUE)
                    </div>

                    <button className="edit-modal-close-btn" onClick={() => closeModal()}>
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>

                <div className="edit-modal-form-box">
                    <button
                        className="decorated-button-edit-channel"
                        onClick={handleDelete}
                    >
                        Delete this Comment
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

export default DeleteCommentModal;
