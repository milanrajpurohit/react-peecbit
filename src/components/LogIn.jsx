/*******************************************
 MODULES INITIALISATION FOR SIGNIN COMPONENT
 ********************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoginSuccess, setLoginPending, setLoginError, token, loggedInUser } from '../actions/index'
import { Form, FormControl, FormGroup, Col, Button} from 'react-bootstrap';
import API from '../api';

// LogIn COMPONENT
class LogIn extends Component {

    // Initialisation of state object
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    // LogIn Method
    async login() {
        this.props.setLoginSuccess(false);
        this.props.setLoginPending(true);
        this.props.setLoginError(null);

        try {
            // API call for login
            const response = await API.post(`login`, { email: this.state.email, password: this.state.password });
            if(!response.data.status) throw response.data.message;

            // Handle response and save user object in store
            this.props.setLoginPending(false);
            this.props.setLoginSuccess(true);
            this.props.token(response.data.data.token);
            this.props.loggedInUser(response.data.data.user);
            this.props.history.replace('/products')

        } catch (error) {
            this.props.setLoginError(error);
        }

    }

    // Render DOM
    render() {
        return (
            <div className="App">
                <div className="App-title">
                    Product Panel
                </div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Email" onChange={event => this.setState({email: event.target.value})} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" onChange={event => this.setState({password: event.target.value})}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={() => this.login()}>Log In</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }

}

export default connect(null, { setLoginSuccess, setLoginPending, setLoginError, token, loggedInUser })(LogIn);