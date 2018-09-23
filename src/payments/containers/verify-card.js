import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import QueryString from 'query-string';
import saveCookie from '../../settings/cookies';

class VerifyCard extends Component {
    state = {
        uid: '',
        cookies: '',
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentDidMount() {

        const parsed = QueryString.parse(location.search);
        const { cookies, } = this.props;
        this.setState({
            uid: parsed.uid,
            email: parsed.email,
            cookies,
        })

       

    }


    save = (e) => {
        
        saveCookie(this.state);
        e.preventDefault();
      }
    

    render() {
        return (
            <div>Verify card
                <button className="btn" onClick={this.save}> Cookie</button>

            </div>
        )
    }
}


export default withCookies(VerifyCard);