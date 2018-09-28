import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';
import HandleError from '../../error/containers/handle-error';
import AddCard from '../../payments/containers/add-card'
import VerifyCard from '../../payments/containers/verify-card';
import { CookiesProvider } from 'react-cookie';
import ModalAwesome from 'react-awesome-modal';

class Home extends Component {
    state = {
        modalVisible: false,
        uid: '',
        transactionId: '',
        skin: '',
    }
    handleOpenModal = (cardResponse) => {
        this.setState({
            modalVisible: true,
            uid: cardResponse.uid,
            transactionId: cardResponse.transactionId,
            skin: cardResponse.skin,
        })
    }
    handleCloseModal = (event) => {
        this.setState({
            modalVisible: false,
        })
    }
    render() {
        return (
            <CookiesProvider>
                <HandleError>
                    <HomeLayout>
                        <AddCard openModal={this.handleOpenModal} />
                        {
                            <ModalAwesome
                                visible={this.state.modalVisible}
                                width="400"
                                height="300"
                                effect="fadeInUp"
                            >
                                <VerifyCard
                                    uid={this.state.uid}
                                    transactionId={this.state.transactionId}
                                    skin={this.state.skin}
                                    closeModal={this.handleCloseModal}
                                />
                            </ModalAwesome>
                        }
                    </HomeLayout>
                </HandleError>
            </CookiesProvider>
        )
    }
}

export default Home