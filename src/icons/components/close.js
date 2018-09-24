import React from 'react';
import image from '../../images/close.png'
import './close.css';

function Close(props) {
    return (
        <img
            className="Close"
            src={image}
            alt="Cerrar"
            width={32}
            height={32}
            onClick={props.handleClose}
        />

    )
}

export default Close