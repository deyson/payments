import React, { Component } from 'react';
import VerifyCardLayout from '../components/verify-card';
import { instanceOf, element, PropTypes } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
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

        const { cookies, uid, transactionId, } = this.props;
        this.setState({
            uid,
            transactionId,
            cookies,
        })

    }
    setInputRef = element => {
        this.input = element;
    }

    handleVerifyCard = (event) => {
        event.preventDefault();

         const { uid, transactionId } = this.state;
        console.log(uid);
        console.log(transactionId);

        let auth = Paymentez.getAuthToken('EXITO-CO-SERVER', 'cvNBJXzsdcH4qpgLq7tlkdtaclIvp2')

        axios.defaults.headers.common['Auth-Token'] = auth;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        debugger;
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
            .then(response => {
                const { cookies, uid } = this.state;

                const cardResponse = {
                    uid,
                    response,
                }

                cookies.set('cardResponse', cardResponse, { path: '/' });
            })
            .catch(error => {
                debugger;
                const { cookies, uid } = this.state;

                const cardResponse = {
                    uid,
                    response: error.response.data.error,
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