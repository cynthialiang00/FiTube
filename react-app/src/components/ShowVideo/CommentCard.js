import React from 'react';
import { useState, useEffect , useRef} from 'react';
import './Card.css';

const CommentCard = ({user,img, name, date, text}) => {

    const [showMenu, setShowMenu] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const ulRef = useRef();

    let commentCardClass = "comment-card";
    if (isHover) commentCardClass = "comment-hover"

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "comment-dropdown" + (showMenu ? "" : " hidden");

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
                (<ul className={ulClassName} ref={ulRef}>
                    {user.username === name ? (
                        <>
                            <li>
                                <button>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    {` EDIT`}
                                </button>
                            </li>
                            <li>
                                <button>
                                    <i class="fa-regular fa-trash-can"></i>
                                    {` DELETE`}
                                </button>
                                
                            </li>

                        </>
                    ) : (
                        <>
                                <li> <i class="fa-regular fa-flag"></i> {` REPORT`}</li>
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
