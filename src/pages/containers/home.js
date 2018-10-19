import React, { Component } from 'react';
import HomeLayout from '../components/home-layout';
import HandleError from '../../error/containers/handle-error';
import AddCard from '../../payments/containers/add-card'
import VerifyCard from '../../payments/containers/verify-card';
import { CookiesProvider } from 'react-cookie';
import ModalAwesome from 'react-awesome-modal';
import LoaderLayout from '../../icons/components/loader-layout';
import QueryString from 'query-string';
import QueryStringError from '../../error/components/query-string-error';

class Home extends Component {
    state = {
        loaderVisible: false,
        contentErrorVisible: false,
        modalVisible: false,
        uid: '',
        email: '',
        skin: '',
        transactionId: '',
    }
    handleOpenModal = (cardResponse) => {
        this.setState({
            modalVisible: true,
            transactionId: cardResponse.transactionId,
        })
    }
    handleCloseModal = (event) => {
        this.setState({
            modalVisible: false,
        })
    }
    handleLoader = (status) => {
        this.setState({
            loaderVisible: status,
        })
    }
    componentDidMount() {
        const parsed = QueryString.parse(location.search);
        this.setState({
            contentErrorVisible: !("uid" in parsed && "email" in parsed && "skin" in parsed),
            uid: parsed.uid,
            email: parsed.email,
            skin: parsed.skin
        })
    }
    render() {
        return (
            <CookiesProvider>
                <HandleError>
                    <HomeLayout>
                        {
                            this.state.contentErrorVisible ?
                                <QueryStringError />
                            :
                            this.state.loaderVisible ?
                                <LoaderLayout 
                                    skin={this.state.skin} 
                                />
                            :
                            <div>
                                <AddCard 
                                    uid={this.state.uid}  
                                    email={this.state.email}
                                    openModal={this.handleOpenModal} 
                                    changeLoaderStatus={this.handleLoader} 
                                />
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
                                            closeModal={this.handleCloseModal}
                                            changeLoaderStatus={this.handleLoader} 
                                        />
                                    </ModalAwesome>
                                }
                            </div>
                        }
                    </HomeLayout>
                </HandleError>
            </CookiesProvider>
        )
    }
}

export default Home