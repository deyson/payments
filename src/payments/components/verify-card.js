import React from 'react';
import './verify-card.css';
import LoaderLayout from '../../icons/components/loader-layout';
import Close from '../../icons/components/close';

function VerifyCardLayout(props) {

    return (
        <div className="VerifyCard">
            <Close handleClose={props.closeModal} />
            <h1>Verificar tarjeta de crédito</h1>

            {
                props.loaderVisible ?
                    <LoaderLayout skin={props.skin} />
                    :
                    <div className="VerifyCard-container">
                        <p>
                            Enviamos un código de verificación al correo electrónico y/o número celular registrado.
                        </p>
                        <label className="VerifyCard-container-label">Ingresa el código:</label>
                        <input
                            type="text"
                            id="code-verify"
                            placeholder="XXXX"
                            ref={props.setRef}
                            className="name form-control"
                            required>
                        </input>
                        <button
                            className={'VerifyCard-button VerifyCard-button-' + props.skin}
                            onClick={props.handleClick} >
                            {props.saveTitle}
                        </button>
                    </div>
            }
        </div>
    )
}

export default VerifyCardLayout;