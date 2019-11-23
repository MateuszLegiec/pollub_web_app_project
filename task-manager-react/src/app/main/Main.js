import React, {Component} from 'react';
import {Col, Nav, Row, Tab} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faTasks, faUser} from '@fortawesome/fontawesome-free-solid';
import Admin from "./admin/Admin";
import Tasks from "./all-tasks/Tasks";
import Account from "./account/Account";
import {authService} from "../service/auth.service";
import TaskModal from "./task/Task.modal";
import {taskService} from "../service/task.service";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {comments: []},
            showModal: false,
            tasks: []
        };
    }

    componentDidMount() {
        taskService.getAll()
            .then(tasks => this.setState({tasks: tasks}))
            .catch(err => console.log(err));
    }

    openModal = (taskId) => {
        taskService.get(taskId)
            .then(response => {this.setState({task: response})})
            .then(() => this.setState({showModal: true}))
    };

    onTaskUpdate = () => {
        taskService.getAll()
            .then(tasks => this.setState({tasks: tasks}))
            .catch(err => console.log(err));

        taskService.get(this.state.task._id)
            .then(response => {this.setState({task: response})})
    };

    onCommentAdded = () => {
        taskService.get(this.state.task._id)
            .then(response => {this.setState({task: response})})
    };

    closeModal = () => {
        this.setState({showModal: false, taskId: null});
        taskService.getAll()
            .then(tasks => this.setState({tasks: tasks}))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <TaskModal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    task={this.state.task}
                    update={this.onTaskUpdate}
                    add={this.onCommentAdded}
                />
                <Tab.Container id="left-tabs-example">
                    <Row>
                        <Col xs={3} sm={2} lg={1} className="mt-5">
                            <Nav variant="pills" className="flex-column" id="side">
                                <Nav.Item className="m-3">
                                    <Nav.Link eventKey="account" className="text-center"><FontAwesomeIcon
                                        icon={faUser}/></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="m-3">
                                    <Nav.Link eventKey="tasks" className="text-center"><FontAwesomeIcon
                                        icon={faTasks}/></Nav.Link>
                                </Nav.Item>
                                {authService.getCurrentUser().admin ?
                                    <Nav.Item className="m-3">
                                        <Nav.Link eventKey="admin" className="text-center"><FontAwesomeIcon
                                            icon={faCog}/></Nav.Link>
                                    </Nav.Item>
                                    : null
                                }
                            </Nav>
                        </Col>
                        <Col xs={9} sm={10} lg={11}>
                            <Tab.Content>
                                <Tab.Pane eventKey="account">
                                    <Account openTask={this.openModal} tasks={this.state.tasks}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="tasks">
                                    <Tasks openTask={this.openModal} tasks={this.state.tasks} onUpdate={this.closeModal}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="admin">
                                    <Admin/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
};
export default Main;
