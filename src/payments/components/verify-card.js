import React from 'react';
import './verify-card.css';

function VerifyCardLayout(props) {

    return (
        <div>

            <input type="text" id="code-verify" placeholder="Código" ref={props.setRef}
                className="name form-control" required></input>
            <button className="btn" onClick={props.handleClick} >{props.saveTitle}</button>

        </div>
    )
}

export default VerifyCardLayout;


