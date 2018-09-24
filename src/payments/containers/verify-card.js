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
        skin: '',
        loaderVisible: false,
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
            skin,
        } = this.props;
        this.setState({
            uid,
            transactionId,
            cookies,
            skin,
        })
        debugger

    }

    componentWillReceiveProps(newProps){
        debugger
        this.setState({
            uid: newProps.uid,
            transactionId: newProps.transactionId,
            skin: newProps.skin,
        })
    }

    setInputRef = element => {
        this.input = element;
    }

    handleVerifyCard = (event) => {
        event.preventDefault();

        this.setState({
            loaderVisible: true,
        })

        const { uid, transactionId } = this.state;
        console.log(uid);
        console.log(transactionId);

        let auth = Paymentez.getAuthToken(
            Utils.paymentezServerApplicationCode,
            Utils.paymentezServerAppKey
        )

        axios.defaults.headers.common['Auth-Token'] = auth;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.post(Utils.urlValidate, {
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

                this.setState({
                    loaderVisible: false,
                })

                const { cookies, uid } = this.state;

                const cardResponse = {
                    uid,
                    response,
                }

                cookies.set('cardResponse', cardResponse, { path: '/' });
                this.props.closeModal();
            })
            .catch(error => {

                this.setState({
                    loaderVisible: false,
                })

                const { cookies, uid } = this.state;

                const cardResponse = {
                    uid,
                    response: error.response.data.error,
                }

                cookies.set('cardResponse', cardResponse, { path: '/' });
                this.props.closeModal();
            });
    }

    render() {
        return (
            <VerifyCardLayout
                handleClick={this.handleVerifyCard}
                setRef={this.setInputRef}
                saveTitle="Verificar"
                loaderVisible={this.state.loaderVisible}
                skin={this.state.skin}
                closeModal={this.props.closeModal}
            />
        )
    }
}


export default withCookies(VerifyCard);