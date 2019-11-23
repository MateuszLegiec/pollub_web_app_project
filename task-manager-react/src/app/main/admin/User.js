import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync, faLock, faLockOpen} from "@fortawesome/fontawesome-free-solid";
import {userService} from "../../service/user.service";
import {authService} from "../../service/auth.service";

const User = (props) => {
    return (
        <div className="shadow-sm">
            <Container>
                <Row className={props.user.isLocked ? "mt-3 pt-3 bg-light-gray" : "mt-3 pt-3"}>
                    <Col sm={4}><i className="font-weight-bold">Email: </i> {props.user.email}</Col>
                    <Col sm={3}><i className="font-weight-bold">First name: </i> {props.user.firstName}</Col>
                    <Col sm={3}><i className="font-weight-bold">Last name: </i> {props.user.lastName}</Col>
                    <Col sm={1} className="mb-1"><Button disabled={props.user.email === authService.getCurrentUser().email} onClick={() => userService.resetOne(props.user.email).then((res) => {alert("New credentials \n email: " + props.user.email + "\n password: " + res.password);props.onUpdate()})} variant="outline-info" title="Reset user password"><FontAwesomeIcon icon={faSync}/></Button></Col>
                    {(props.user.isLocked) ?
                        <Col sm={1} className="mb-3"><Button disabled={props.user.email === authService.getCurrentUser().email} onClick={() => userService.unlockOne(props.user.email).then(() => props.onUpdate())} variant={"outline-success"}><FontAwesomeIcon icon={faLockOpen}/></Button></Col>:
                        <Col sm={1} className="mb-3"><Button disabled={props.user.email === authService.getCurrentUser().email} onClick={() => userService.lockOne(props.user.email).then(() => props.onUpdate())} variant={"outline-warning"}><FontAwesomeIcon icon={faLock}/></Button></Col>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default User;
