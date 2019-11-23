import React, {Component} from 'react';
import { Col, Container} from "react-bootstrap";
import ToDoTask from "./ToDoTask";
import {authService} from "../../service/auth.service";
import OrderedTask from "./OrderedTask";

class Account extends Component {

    state = {
        value: ''
    };

    render() {
        return (
            <div>
                <h6 className="text-right m-3">Signed as: {authService.getCurrentUser().firstName} {authService.getCurrentUser().lastName} ( {authService.getCurrentUser().email} )</h6>
                <Container>
                    <Col sm={12} className="mb-5 pb-5">
                        <h1 className="font-weight-bold mt-4 mb-4">Your tasks</h1>
                        <h4 className="mt-4 ml-1">Assigned to you</h4>
                        {this.props.tasks
                            .filter(task => task.status !== 'Done')
                            .filter(task => task.assignedUser != null)
                            .filter(task => task.assignedUser.includes(authService.getCurrentUser().email))
                            .map(task => <ToDoTask key={task._id} task={task} openTask={this.props.openTask}/>)
                        }
                        <h4 className="mt-4 ml-1">Ordered tasks</h4>
                        {this.props.tasks
                            .filter(task => task.status !== 'Done')
                            .filter(task => task.orderedBy != null)
                            .filter(task => task.orderedBy.includes(authService.getCurrentUser().email))
                            .map(task => <OrderedTask key={task._id} task={task} openTask={this.props.openTask}/>)
                        }
                    </Col>
                </Container>
            </div>
        );
    }
}
export default Account;
