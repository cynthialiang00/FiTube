import React, { useState, useContext } from 'react';

const EditCommentContext = React.createContext();

export const useEditCommentContext = () => useContext(EditCommentContext);

export function EditCommentProvider({ children }) {
    const [isEditComment, setIsEditComment] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);

    const contextValue = {
        isEditComment,
        setIsEditComment,
        editCommentId,
        setEditCommentId
    };

    return (
        <>
            <EditCommentContext.Provider value={contextValue}>
                {children}
            </EditCommentContext.Provider>
        </>
    );
}
