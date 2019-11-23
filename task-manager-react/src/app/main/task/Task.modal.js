import {Button, Col, Modal, Row, Form} from "react-bootstrap";
import React, {Component} from "react";
import {taskService} from "../../service/task.service";
import Comment from "./Comment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";
import {priorityIcon} from "../util/PriorityIcon.mapper";
import {userService} from "../../service/user.service";
import {currentDate, readableDate} from "../util/Date.mapper";

class TaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statuses: [],
            commentText: '',
            users: [],
        };
    }

    componentDidMount() {
        taskService.getStatuses()
            .then(statuses => {this.setState({statuses});})
            .catch(err => console.log(err));

        userService.getAll()
            .then(users => this.setState({users}))
            .catch(err => console.log(err));
    }

    addComment(){
        if (this.state.commentText !== '') {
            taskService.addComment(this.props.task._id, {content: this.state.commentText})
                .then(() => {
                    this.props.add();
                    this.setState({commentText: ''});

                })
        }
    };

    updateTask(event){
        let form = event.currentTarget;
        event.preventDefault();
        let task = this.props.task;
        task.assignedUser = form.assignedUser[form.assignedUser.selectedIndex].getAttribute('data-key');
        task.status = form.status[form.status.selectedIndex].getAttribute('data-key');
        task.deadline = form.deadline.value;

        taskService.update(task)
            .then(response => {
                alert(response);
                this.props.update();
            })
    }

    handleChange = (e) => {this.setState({commentText: e.target.value})};

    render() {
        return (
            <Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.task.title}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={(event) => this.updateTask(event)}>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <div className="mt-3 mb-3"><span className="font-weight-bold mr-3">Ordered by:</span>{this.props.task.orderedBy}</div>
                                <div className="mt-3 mb-3"><span className="font-weight-bold mr-3">Creation date:</span>{readableDate(this.props.task.creationDate)}</div>
                                <div className="mt-3 mb-3"><span className="font-weight-bold mr-3">Deadline:</span>
                                    <Form.Group controlId="deadline">
                                        <Form.Control type="date" className="w-75" min={currentDate()} defaultValue={readableDate(this.props.task.deadline)}/>
                                    </Form.Group>
                                </div>
                                <div className="mt-3 mb-3"><span className="font-weight-bold mr-3">Assigned user:</span>
                                    <Form.Group controlId="assignedUser">
                                        <Form.Control size="sm" as="select" className="w-75" defaultValue={this.props.task.assignedUser}>
                                            <option/>
                                            {
                                                this.state.users
                                                    .filter(user => !user.isLocked)
                                                    .map(user => <option value={user.email} key={user.email} data-key={user.email}>{user.firstName} {user.lastName} ({user.email})</option>)
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="mt-3 mb-3"><span className="font-weight-bold ml-3 mr-3">Priority:</span>{priorityIcon(this.props.task.priority)} priority</div>
                                <div className="mt-3 mb-3"><span className="font-weight-bold ml-3 mr-3">Status:</span>
                                    <Form.Group controlId="status">
                                        <Form.Control size="sm" as="select" className="ml-3 w-50" defaultValue={this.props.task.status}>
                                            <option/>
                                            {
                                                this.state.statuses
                                                    .map(status => <option data-key={status} value={status} key={status}>{status}</option>)
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        <div>
                            <div className="m-5">{this.props.task.description}</div>
                        </div>
                        <Row className="justify-content-center">
                            <Col sm={10}>
                                <h4>Comments</h4>
                                {
                                    this.props.task.comments
                                        .sort((a, b) => (a.creationDate < b.creationDate) ? 1 : -1)
                                        .map(comment => <Comment key={comment.creationDate} comment={comment}/>)
                                }
                                <Row className="mt-5">
                                    <Col sm={11}><Form.Control as="textarea" rows="2" onChange={e => this.handleChange(e)} placeholder="..."/></Col>
                                    <Col sm={1}><Button size="sm" variant="outline-primary" disable={this.state.commentText === ''} onClick={e => this.addComment(e)}><FontAwesomeIcon icon={faPlus}/></Button></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    };
}
export default TaskModal;
