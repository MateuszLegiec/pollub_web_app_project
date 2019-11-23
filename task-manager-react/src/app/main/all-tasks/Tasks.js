import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/fontawesome-free-solid";
import Task from "./Task";
import NewTaskModal from "./NewTask.modal";
import {taskService} from "../../service/task.service";
import {authService} from "../../service/auth.service";

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            searchText: '',
            searchStatus: '',
            statuses: [],
        };
    }

    componentDidMount() {
        taskService.getStatuses()
            .then(statuses => this.setState({statuses: statuses}))
            .catch(err => console.log(err));

        this.setState({tasks: this.props.tasks});
    }

    handleTextSearch(event){this.setState({searchText: event.target.value});};

    handleSelectSearch(event){this.setState({searchStatus: event.target.value})}

    openModal = () => {this.setState({showModal: true})};

    closeModal = () => {
        this.setState({showModal: false});
        this.props.onUpdate();
    };


    render() {
        return (
            <Container>
                <Col sm={12} className="mb-5 pb-5">
                    {authService.getCurrentUser().admin ? <Button variant="outline-primary" className="mt-5 w-100" onClick={this.openModal}>Add task <FontAwesomeIcon icon={faPlus}/></Button> : null}
                    <NewTaskModal
                        show={this.state.showModal}
                        onHide={this.closeModal}
                    />
                    <Row className="mt-5">
                        <Col sm={9}>
                            <Form.Control type="text" placeholder="Find task..." onChange={e => this.handleTextSearch(e)}/>
                        </Col>
                        <Col sm={3}>
                            <Form.Control as="select" onChange={e => this.handleSelectSearch(e)}>
                                <option/>
                                {this.state.statuses.map(status => <option key={status}>{status}</option>)}
                            </Form.Control>
                        </Col>
                    </Row>
                    {this.props.tasks
                        .filter(task => (task.assignedUser !== null) ? (task.title.includes(this.state.searchText) || task.assignedUser.includes(this.state.searchText)): task.title.includes(this.state.searchText))
                        .filter(task => task.status.includes(this.state.searchStatus))
                        .map(task => <Task key={task._id} task={task} openTask={this.props.openTask}/>)
                    }
                </Col>
            </Container>
        );
    }
}
export default Tasks;
