import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import {priorityIcon} from "../util/PriorityIcon.mapper";
import {readableDate} from "../util/Date.mapper";

const OrderedTask = (props) => {
    return (
        <div className="shadow-sm hover cursor-pointer" onClick={() => props.openTask(props.task._id)}>
            <Container>
                <Row className="mt-3 pt-2 pb-2">
                    <Col sm={3}><i className="font-weight-bold">Title: </i> {props.task.title}</Col>
                    <Col sm={4}><i className="font-weight-bold">Assigned user: </i> {props.task.assignedUser}</Col>
                    <Col sm={3}><i className="font-weight-bold">Deadline: </i> {readableDate(props.task.deadline)}</Col>
                    <Col sm={2} className="text-center">{priorityIcon(props.task.priority)}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderedTask;
