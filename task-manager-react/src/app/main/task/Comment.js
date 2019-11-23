import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import {readableDate} from "../util/Date.mapper";

const Comment = (props) => {
    return (
        <div className="shadow-sm rounded p-3">
            <Container>
                <Row>
                    <Col><small>{readableDate(props.comment.creationDate)}</small></Col>
                    <Col className="text-right"><small>{props.comment.user}</small></Col>
                    <Col sm={{span: 10, offset:1}} className="mt-2">{props.comment.content}</Col>
                </Row>
            </Container>
        </div>
    );
};

export default Comment;