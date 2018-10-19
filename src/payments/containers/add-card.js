import React, { Component } from 'react';
import AddCardLayout from '../components/add-card';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class AddCard extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentWillMount() {
        window.Paymentez.init(
            PAYMENTEZ_ENVIRONMENT,
            PAYMENTEZ_CLIENT_APPLICATION_CODE,
            PAYMENTEZ_CLIENT_APPLICATION_KEY
        );
    }

    handleAddCard = (event) => {
        event.preventDefault();
        var myCard = $('#my-card');
        var cardToSave = myCard.PaymentezForm('card');
        if (cardToSave == null) {
            alert("Datos de tarjeta inválidos");
            return;
        }
        
        Paymentez.addCard(
            this.props.uid,
            this.props.email,
            cardToSave,
            this.successHandler,
            this.errorHandler
        );

        this.props.changeLoaderStatus(true);
    }

    successHandler = (cardResponse) => {
        this.props.changeLoaderStatus(false);
        if (cardResponse.card.status === 'pending') {
            this.props.openModal({
                transactionId: cardResponse.card.transaction_reference,
            });
        } else {
            this.setCookie(cardResponse.card);
        }
    }

    errorHandler = (err) => {
        this.props.changeLoaderStatus(false);
        this.setCookie(err.error);
    }

    setCookie = (response) => {
        const cardResponse = {
            uid: this.props.uid,
            response,
        }
        const { cookies } = this.props;
        cookies.set('cardResponse', cardResponse, { path: '/' });
        window.location.reload();
    }

    render() {
        return (
            <AddCardLayout 
                handleClick={this.handleAddCard} 
                saveTitle="Guardar" 
            />
        )
    }
}

export default withCookies(AddCard);