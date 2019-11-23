import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import {priorityIcon} from "../util/PriorityIcon.mapper";

const Task = (props) => {
    return (
        <div className="shadow-sm hover cursor-pointer" onClick={() => props.openTask(props.task._id)}>
            <Container>
                <Row className="mt-3 pt-2 pb-2">
                    <Col sm={4}><i className="font-weight-bold">Title: </i> {props.task.title}</Col>
                    <Col sm={4}><i className="font-weight-bold">Assigned user: </i> {props.task.assignedUser}</Col>
                    <Col sm={2}><i className="font-weight-bold">Status: </i> {props.task.status}</Col>
                    <Col sm={2}>{priorityIcon(props.task.priority)}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Task;
