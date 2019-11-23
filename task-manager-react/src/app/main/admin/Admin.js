import React, {Component} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";
import User from "./User";
import {userService} from "../../service/user.service";
import NewUserModal from "./NewUser.modal";

class Admin extends Component {

    state = {
        value: '',
        showModal: false,
        searchText: '',
        searchStatus: '',
        userAdded: false,
        users: []
    };

    componentDidMount() {
        userService.getAll()
            .then(users => this.setState({users}))
            .catch(err => console.log(err));
    }

    handleChange(event){this.setState({value: event.target.value});};

    openModal = () => {this.setState({showModal: true});};

    closeModal = () => {
        this.setState({showModal: false});
    };

    handleUpdate = () => {
        userService.getAll()
            .then(users => this.setState({users}))
            .catch(err => console.log(err));
    };

    render(){
        return (
            <Container>
                <NewUserModal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    onAdd={this.handleUpdate}
                />
                <Col sm={12} className="mb-5 pb-5">
                    <Button onClick={this.openModal} variant="outline-primary" className="mt-5 w-100">Add user <FontAwesomeIcon icon={faPlus}/></Button>
                    <Form.Control type="text" placeholder="Find user..." className="w-100 mt-5" value={this.state.value} onChange={e => this.handleChange(e)}/>
                    {this.state.users
                        .filter(user => user.email.includes(this.state.value) || user.firstName.includes(this.state.value) || user.lastName.includes(this.state.value))
                        .map(user => <User key={user.email} user={user} onUpdate={this.handleUpdate}/>)
                    }
                </Col>
            </Container>
        );
    }
}
export default Admin;
