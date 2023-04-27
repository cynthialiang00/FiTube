import React from 'react';
import { useState, useEffect , useRef} from 'react';
import OpenModalButton from '../OpenModalButton';
import DeleteCommentModal from './CommentModals/DeleteCommentModal';
import { useEditCommentContext } from '../../context/EditContext';
import EditComment from './EditComment';
import './Card.css';

const CommentCard = ({user,img, name, date, text, commentId}) => {
    const { isEditComment, setIsEditComment, setEditCommentId, editCommentId } = useEditCommentContext();

    const [showMenu, setShowMenu] = useState(false);
    const [isHover, setIsHover] = useState(false);

    // const ulRef = useRef();

    let commentCardClass = "comment-card";
    if (isHover) commentCardClass = "comment-hover"

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => setShowMenu(false);

    // useEffect(() => {
    //     if (!showMenu) return;

    //     // const closeMenu = (e) => {
    //     //     if (!ulRef.current.contains(e.target)) {
    //     //         setShowMenu(false);
    //     //     }
    //     // };


    //     document.addEventListener("click", closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    const settingEdit = (e) => {
        e.preventDefault();
        setIsEditComment(true);
        setEditCommentId(commentId);
    }
    

    const ulClassName = "comment-dropdown" + (showMenu ? "" : " hidden");
    
    if (isEditComment && editCommentId === commentId) {
        return (

            <EditComment
                user={user}
                text={text}
                commentId={commentId}
            />
            
        )
    }
    return (
        <div className="each-comment-container"
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}
        >
            <div className={commentCardClass}>
                <img className="comment-img" src={img} alt={`${name}'s avatar`}></img>
                <div className="comment-name">
                    {name}
                    <span>{date.slice(5,16)}</span>
                </div>
                <div className="comment-text">{text}</div>

            </div>
            {user && isHover ?
                (<button className="comment-drop" onClick={openMenu}>
                    <i className="fa-solid fa-ellipsis-vertical" style={{fontSize: "15px"}}></i>
                </button>)
                :
                null
            }
            {user ? 
                (<ul className={ulClassName}
                    onMouseLeave={() => setShowMenu(false)}
                >
                    {user.username === name ? (
                        <>
                            <li>
                                <button onClick={settingEdit}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    {` EDIT`}
                                </button>
                            </li>
                            <li>
                                <OpenModalButton
                                    buttonText={<><i className="fa-regular fa-trash-can"></i>{` DELETE`}</>}
                                    modalComponent={<DeleteCommentModal commentId={commentId}/>}
                                />
                                {/* <button>
                                    <i class="fa-regular fa-trash-can"></i>
                                    {` DELETE`}
                                </button> */}
                                
                            </li>

                        </>
                    ) : (
                        <>
                                <li> <i className="fa-regular fa-flag"></i> {` REPORT`}</li>
                        </>
                    )}
                </ul>)
                :
                null
            }
        
        </div>
    )
        
};

export default CommentCard;
