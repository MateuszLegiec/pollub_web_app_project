import React from 'react';
import NavBar from "./NavBar";
import Main from "./main/Main";
import Footer from "./Footer";
import Login from "./login/Login";
import {authService} from "./service/auth.service";
import FirstLogin from "./login/FirstLogin";

const Root = () => {
        return (
            <div >
                <NavBar/>
                {(sessionStorage.getItem('token')) ? ((authService.getCurrentUser().firstLogin) ? <FirstLogin/> : <Main/>) : <Login/>}
                {/*{(true) ? ((authService.getCurrentUser().firstLogin) ? <FirstLogin/> : <Main/>) : <Login/>}*/}
                <Footer/>
            </div>
        );
};
export default Root;
