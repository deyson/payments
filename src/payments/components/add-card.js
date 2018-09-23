import React from 'react';
import './add-card.css';

function AddCardLayout(props) {
  
    return (
        <div>
            <form id="add-card-form">
                <div className="paymentez-form" id="my-card" data-capture-name="true" />
                <button className="btn">Save</button>

            </form>
        </div>
    )
}

export default AddCardLayout;


