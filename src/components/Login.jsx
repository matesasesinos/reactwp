import React, { Component} from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            username: '',
            password: '',
            userNiceName: '',
            userEmail: '',
            loggedIn: false,
            loading: false,
            error: ''
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        const siteUrl = 'http://apiwp.test';

        const loginData = {
            username: this.state.username,
            password: this.state.password
        }

        this.setState( {loading:true}, () => {
            axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token`, loginData)
            .then( res => {
                //console.log(res.data);
                if( undefined === res.data.token ) {
                    this.setState( { error: res.data.message , loading: false});
                    return;
                }
               const { token, user_nicename, user_email } = res.data;
                
                localStorage.setItem( 'token', res.data.token );
                localStorage.setItem( 'userName', res.data.user_nicename );

                this.setState( { 
                    loading: false,
                    token: token,
                    userNiceName: user_nicename,
                    userEmail: user_email,
                    loggedIn: true
                 })
            })
            .catch( err => {
                this.setState( {error: err.response.data, loading:false })
            });
        })

    }
    handleOnChange = ( event) => {
        this.setState( {[ event.target.name ]: event.target.value} )
    }
    render() {

        const { username, password, loggedIn, userNiceName } = this.state;
        const user = userNiceName ? userNiceName : localStorage.getItem('userName');
        

           if(loggedIn || localStorage.getItem( 'token' )) {
                return <Redirect to={`/panel/${user}`} />
           } else {
            return (<div>
                <Navbar />
                <br />
                <form onSubmit={this.onFormSubmit}>
                    <label>Usuario </label>
                    <input type="text" name="username" value={username} onChange={this.handleOnChange} />
                        <br />
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={this.handleOnChange} />

                    <p><button>Login</button></p>
                </form>
            </div>  )
           }
            
      
    }
}

export default Login;