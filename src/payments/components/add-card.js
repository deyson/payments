import React from 'react';
import './add-card.css';

function AddCardLayout(props) {
    return (
        <div className="AddCard">
            <div className="AddCard-container">
                <h1>Agregar tarjeta de crédito</h1>
                <form id="add-card-form">
                    <div
                        className="paymentez-form"
                        id="my-card"
                        data-capture-name="true"
                    />
                    <button
                        className="AddCard-button"
                        onClick={props.handleClick} >
                        {props.saveTitle}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCardLayout;


