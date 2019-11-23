import React, {Component} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {authService} from "../service/auth.service";

class Login extends Component {

    state = {
        error: '',
        email: '',
        password: ''
    };

    handleEmailChange(e){this.setState({email: e.target.value})}
    handlePasswordChange(e){this.setState({password: e.target.value});}
    tryLogin(){this.setState({error:authService.login(this.state.email, this.state.password)});};

    render() {
        return (
            <Container className="mt-5 pt-5">
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        {(this.state.error ? <Alert variant="danger">{this.state.error}</Alert> : null)}
                        <Form>
                            <Form.Group>
                                <Form.Label column={this.state.email}>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.handleEmailChange(e)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label column={this.state.password}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => this.handlePasswordChange(e)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={() => this.tryLogin()} className="w-100 mt-3">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Login;