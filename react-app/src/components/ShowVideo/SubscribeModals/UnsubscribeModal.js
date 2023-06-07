
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkUnSubscribeVideoUser } from "../../../store/videos";
import './UnsubscribeModal.css';

const UnsubscribeModal = ({ userId, username }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const handleUnsub = async (e, userId) => {
        e.preventDefault();
        await dispatch(thunkUnSubscribeVideoUser(userId));
        closeModal();
    };


    return (
        <div className='unsub-modal'>
            <div className='unsub-modal-header'>

                <button className="delete-modal-close-btn" onClick={() => closeModal()}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>

            <div className='unsub-modal-body'>
                <p>Unsubscribe from {username}?</p>
            </div>

            <div className="unsub-modal-btns">

                <button
                    id="unsub-modal-cancel"
                    onClick={() => closeModal()}
                >
                    Cancel
                </button>

                <button
                    id="unsub-modal-delete"
                    onClick={(e) => handleUnsub(e, userId)}
                >
                    Unsubscribe
                </button>
            </div>
        </div>
    )

};

export default UnsubscribeModal;
