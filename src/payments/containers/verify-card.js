import React, { Component } from 'react';
import VerifyCardLayout from '../components/verify-card';
import { instanceOf, element, PropTypes } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios'

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
        const {
            cookies,
            uid,
            transactionId,
        } = this.props;
        this.setState({
            uid,
            transactionId,
            cookies,
        })
    }

    componentWillReceiveProps(newProps){
        this.setState({
            uid: newProps.uid,
            transactionId: newProps.transactionId,
        })
    }

    setInputRef = element => {
        this.input = element;
    }

    handleVerifyCard = (event) => {
        event.preventDefault();

        this.props.changeLoaderStatus(true);

        const { uid, transactionId } = this.state;

        let auth = Paymentez.getAuthToken(
            PAYMENTEZ_SERVER_APPLICATION_CODE,
            PAYMENTEZ_SERVER_APPLICATION_KEY
        )

        axios.defaults.headers.common['Auth-Token'] = auth;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.post(PAYMENTEZ_API_VERIFY_URL, {
            "user": {
                "id": uid
            },
            "transaction": {
                "id": transactionId
            },
            "type": "BY_OTP",
            "value": this.input.value
        })
        .then(response => {
            this.props.changeLoaderStatus(false);
            const { cookies, uid } = this.state;
            const cardResponse = {
                uid,
                response,
            }

            cookies.set('cardResponse', cardResponse, { path: '/' });
            window.location.reload();
        })
        .catch(error => {
            this.props.changeLoaderStatus(false);
            const { cookies, uid } = this.state;
            const cardResponse = {
                uid,
                response: error.response.data.error,
            }

            cookies.set('cardResponse', cardResponse, { path: '/' });
            window.location.reload();
        });
    }

    render() {
        return (
            <VerifyCardLayout
                handleClick={this.handleVerifyCard}
                setRef={this.setInputRef}
                saveTitle="Verificar"
                closeModal={this.props.closeModal}
            />
        )
    }
}


export default withCookies(VerifyCard);