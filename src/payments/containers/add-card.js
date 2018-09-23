import React, { Component } from 'react';
import AddCardLayout from '../components/add-card';
import QueryString from 'query-string';

class AddCard extends Component {
    state = {
        uid: '',
        email: ''
    }
    componentDidMount() {
        console.log(location.search);
        const parsed = QueryString.parse(location.search);
        this.setState({
            uid: parsed.uid,
            email: parsed.email,
        })
    }
    render() {
        return (
            <AddCardLayout />
        )
    }
}

export default AddCard;