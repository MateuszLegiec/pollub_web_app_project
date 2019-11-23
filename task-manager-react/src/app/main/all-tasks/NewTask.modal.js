import {Alert, Button, Form, Modal} from "react-bootstrap";
import React, {Component} from "react";
import {taskService} from "../../service/task.service";
import {currentDate} from "../util/Date.mapper";
import {userService} from "../../service/user.service";

class NewTaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            validated: false,
            msg: ''
        };
    }

    componentDidMount() {
        userService.getAll()
            .then(users => this.setState({users}))
            .catch(err => console.log(err));
    }

    setValidated(isValid){this.setState({validated: isValid})};

    saveTask(event){
        let form = event.currentTarget;
        event.preventDefault();
        this.setValidated(true);
        if (!form.checkValidity()){
            event.stopPropagation();
        } else {
            const newTask = {
                title: form.title.value,
                description:  form.description.value,
                deadline: form.deadline.value,
                priority: form.priority[form.priority.selectedIndex].getAttribute('data-key'),
                assignedUser: form.assignedUser[form.assignedUser.selectedIndex].getAttribute('data-key')
            };
            taskService.save(newTask).then((response) => {
                this.setState({msg:response});
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
                    <Modal.Title id="contained-modal-title-vcenter">Add task</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={this.state.validated} onSubmit={(e) => this.saveTask(e)}>
                    <Modal.Body>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required type="text" placeholder="Title" maxLength={10}/>
                            <Form.Control.Feedback type="invalid">Please provide title</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required as="textarea" placeholder="Description" rows="3" maxLength={100}/>
                            <Form.Control.Feedback type="invalid">Please provide title</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="deadline">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="date" min={currentDate()}/>
                        </Form.Group>

                        <Form.Group controlId="priority">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select">
                                <option/>
                                <option key="3" data-key="3">High</option>
                                <option key="2" data-key="2">Medium</option>
                                <option key="1" data-key="1">Low</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="assignedUser">
                            <Form.Label>Assign user</Form.Label>
                            <Form.Control as="select">
                                <option/>
                                {this.state.users
                                    .filter(user => !user.isLocked)
                                    .map(user => <option
                                        key={user.email} data-key={user.email}>{user.firstName} {user.lastName} ({user.email})</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                        {(this.state.msg) ? <Alert variant="info">{this.state.msg}</Alert> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default NewTaskModal;
