import React, {Component} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {userService} from "../service/user.service";
import {authService} from "../service/auth.service";

class FirstLogin extends Component {

    state = {
        error: '',
        password: '',
        confirmedPassword: ''
    };

    handlePasswordChange(e){this.setState({password: e.target.value})}
    handlePasswordConfirmedPasswordChange(e){this.setState({confirmedPassword: e.target.value})}
    tryChangePassword(){
        const body = {password: this.state.password,confirmedPassword:this.state.confirmedPassword};

        if (!(body.password === body.confirmedPassword))
        {
            this.setState({error: 'Passwords do not match'});
        }
        else if (!(body.password.match('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{6,}$')))
        {
            this.setState({error: 'Invalid password'});
        }
        else
        {
            userService.changePassword(body)
                .then(response => {
                    alert(response);
                    authService.logout();
                    }
                );
        }
    };

    render() {
        return (
            <Container className="mt-5 pt-5">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        {(this.state.error)?<Alert variant="danger">{this.state.error}</Alert>:null}
                        <Alert variant="success font-weight-bold">Logged in successfully</Alert>
                        <Alert variant="info">Please change your password
                            <p>Password should have:</p>
                            <p>* at least one number</p>
                            <p>* at least one special character</p>
                            <p>* at least one lower case</p>
                            <p>* at least one upper case</p>
                            <p>* at least one 6 characters</p>
                            <p>* can not have white spaces</p>
                        </Alert>
                        <Form>
                            <Form.Group>
                                <Form.Label column={this.state.password}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" onChange={(e) => this.handlePasswordChange(e)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label column={this.state.confirmedPassword}>Confirmed password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" onChange={(e) => this.handlePasswordConfirmedPasswordChange(e)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={() => this.tryChangePassword()} className="w-100 mt-3">
                                Change
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default FirstLogin;
