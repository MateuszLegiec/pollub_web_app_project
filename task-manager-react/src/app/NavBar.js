import React from 'react';
import {Navbar} from "react-bootstrap";
import {faSignOutAlt} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {authService} from "./service/auth.service";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" className="w-5">
            <Navbar.Brand href="#home">LOGO</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {
                    (authService.isAuthenticated()) ?
                        <Navbar.Text>
                            <FontAwesomeIcon className="hover-text-white" icon={faSignOutAlt} onClick={() => authService.logout()}/>
                        </Navbar.Text> : null
                }

            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
