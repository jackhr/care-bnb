import React from 'react';

export default function Error(props) {

    return(
        <div className="errorContainer">
            <h6>{props.error}</h6>
        </div>
    )
}