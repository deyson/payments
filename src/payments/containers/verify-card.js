import React, { Component } from 'react';
import VerifyCardLayout from '../components/verify-card';
import { instanceOf, element, PropTypes } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import QueryString from 'query-string';
import axios from 'axios'
import Utils from '../../settings/util';

class VerifyCard extends Component {
    state = {
        uid: '',
        cookies: '',
        value: '',
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
        uid: PropTypes.string.isRequired,
        transactionId: PropTypes.string.isRequired,
    };

    componentDidMount() {
        
        const parsed = QueryString.parse(location.search);
        const { cookies } = this.props;
        this.setState({
            uid: parsed.uid,
            email: parsed.email,
            cookies,
        })



    }
    setInputRef = element => {
        this.input = element;
    }

    handleVerifyCard = (event) => {
        event.preventDefault();
        
        const { uid, transactionId } = this.props;
        console.log(uid);
        console.log(transactionId);

        axios.post('https://ccapi-stg.paymentez.com/v2/transaction/verify', {
            "user": {
                "id": uid
            },
            "transaction": {
                "id": transactionId
            },
            "type": "BY_AMOUNT",
            "value": this.input.value
        })
            .then(function (response) {
                const { cookies, uid } = this.props;

                const cardResponse = {
                    uid,
                    response,
                }

                cookies.set('cardResponse', cardResponse, { path: '/' });
            })
            .catch(function (error) {
                const { cookies, uid } = this.props;

                const cardResponse = {
                    uid,
                    response: error,
                }

                cookies.set('cardResponse', cardResponse, { path: '/' });
            });
    }


    render() {
        return (
            <VerifyCardLayout handleClick={this.handleVerifyCard} setRef={this.setInputRef}
                saveTitle="Verificar" />
        )
    }
}


export default withCookies(VerifyCard);