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
        modalVisible: true,
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
                    <AddCard />
                    {
                        this.state.modalVisible &&
                        <ModalContainer>
                            <Modal
                                handleClick={this.handleCloseModal}
                            >
                                <VerifyCard />
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