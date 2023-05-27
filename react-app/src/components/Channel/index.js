import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";


import numberFormat from "../../helperFuncs/numberFormat";


function Channel() {
    const dispatch = useDispatch();

    useEffect(() => {
    }, [dispatch]);


    return (
        <>
            Hello, welcome to my channel
        </>
    );
}

export default Channel;
