import React from 'react';
import './add-card.css';
import LoaderLayout from '../../icons/components/loader-layout';

function AddCardLayout(props) {
    return (
        <div className="AddCard">
            <div className="AddCard-container">
                <h1>Agregar tarjeta de crédito</h1>
                {
                    props.loaderVisible ?
                        <LoaderLayout skin={props.skin} />
                        :
                        <form id="add-card-form">
                            <div
                                className="paymentez-form"
                                id="my-card"
                                data-capture-name="true"
                            />
                            <button
                                className={'AddCard-button AddCard-button-' + props.skin}
                                onClick={props.handleClick} >
                                {props.saveTitle}
                            </button>
                        </form>
                }
            </div>
        </div>
    )
}

export default AddCardLayout;


