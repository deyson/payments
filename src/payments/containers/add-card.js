import React, { Component } from 'react';
import AddCardLayout from '../components/add-card';
import QueryString from 'query-string';
import Utils from '../../settings/util';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class AddCard extends Component {
    state = {
        uid: '',
        email: '',
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentWillMount() {
        window.Paymentez.init(
            'stg',  //TODO:
            Utils.paymentezClientApplicationCode,
            Utils.paymentezClientAppKey
        );
    }

    componentDidMount() {
        const parsed = QueryString.parse(location.search);
        this.setState({
            uid: parsed.uid,
            email: parsed.email,
        })
    }

    handleAddCard = (event) => {
        event.preventDefault();
        var myCard = $('#my-card');
        var cardToSave = myCard.PaymentezForm('card');
        if (cardToSave == null) {
            alert("Invalid Card Data");
            return;
        }

        Paymentez.addCard(
            this.state.uid,
            this.state.email,
            cardToSave,
            this.successHandler,
            this.errorHandler
        );
    }

    successHandler = (cardResponse) => {
        console.log(cardResponse.card);
        if (cardResponse.card.status === 'valid') {
            this.props.openModal({
                uid: this.state.uid,
                transactionId: cardResponse.card.transaction_reference,
            });
        } else {
            this.setCookie(cardResponse.card);
        }
    }

    errorHandler = (err) => {
        console.log(err.error);
        this.setCookie(err.error);
    }

    setCookie = (response) => {
        const cardResponse = {
            uid: this.state.uid,
            response,
        }
        const { cookies } = this.props;
        cookies.set('cardResponse', cardResponse, { path: '/' });
    }

    render() {
        return (
            <AddCardLayout handleClick={this.handleAddCard} saveTitle="Guardar" />
        )
    }
}

export default withCookies(AddCard);