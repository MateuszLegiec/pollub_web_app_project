import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {Component} from "react";
import {userService} from "../../service/user.service";

class NewUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            response: {}
        };
    }

    setValidated(isValid){this.setState({validated: isValid})};

    saveUser(event){
        let form = event.currentTarget;
        event.preventDefault();
        this.setValidated(true);
        if (!form.checkValidity()){
            event.stopPropagation();
        } else {
            const user = {
                email: form.email.value,
                firstName:  form.firstName.value,
                lastName: form.lastName.value,
                isAdmin: form.isAdmin.checked
            };
            userService.saveOne(user).then(response => {
                this.setState({response: response});
                this.props.onAdd();
            });
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add user
                    </Modal.Title>
                </Modal.Header>
                    <Form noValidate validated={this.state.validated} onSubmit={(e) => this.saveUser(e)}>
                        <Modal.Body>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Email"/>
                            <Form.Control.Feedback type="invalid">Please provide valid email</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="text" placeholder="First name" maxLength={50}/>
                            <Form.Control.Feedback>Please provide valid first name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="text" placeholder="Last name" maxLength={50}/>
                            <Form.Control.Feedback type="invalid">Please provide valid last name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="isAdmin">
                            <Row>
                                <Col sm={1}><Form.Label>Admin</Form.Label></Col>
                                <Col sm={1}><Form.Check type="checkbox"/></Col>
                            </Row>
                        </Form.Group>
                         {(this.state.response.password) ? <Alert variant="info">Generated password: <Alert.Link>{this.state.response.password}</Alert.Link></Alert> : null}
                         {(this.state.response.error) ? <Alert variant="danger">{this.state.response.error}</Alert> : null}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Save</Button>
                        </Modal.Footer>
                    </Form>
            </Modal>
        );
    }
}

export default NewUserModal;
