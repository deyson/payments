import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import ModalContainer from '../../widgets/containers/modal';
import Modal from '../../widgets/components/modal';
import HandleError from '../../error/containers/handle-error';
import AddCard from '../../payments/containers/add-card'
import VerifyCard from '../../payments/containers/verify-card';
import { CookiesProvider } from 'react-cookie';

class Home extends Component {
    state = {
        modalVisible: false,
        uid: '',
        transactionId: '',
    }
    handleOpenModal = (cardResponse) => {
        debugger
        this.setState({
          modalVisible: true,
          uid: cardResponse.uid,
          transactionId: cardResponse.transactionId,
        })
    }
    handleCloseModal = (event) => {
        this.setState({
            modalVisible: false,
        })
    }
    render() {
        return (<CookiesProvider>
            <HandleError>
                <HomeLayout>
                    <AddCard openModal={this.handleOpenModal} />
                    {
                        this.state.modalVisible &&
                        <ModalContainer>
                            <Modal
                                handleClick={this.handleCloseModal}
                            >
                                <VerifyCard 
                                    uid={this.state.uid} 
                                    transactionId={this.state.transactionId} />
                            </Modal>
                        </ModalContainer>
                    }
                </HomeLayout>
            </HandleError>
        </CookiesProvider>
        )
    }
}

export default Home