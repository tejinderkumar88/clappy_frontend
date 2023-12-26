import React from "react";
import dellicon from "../../assets/img/dell.svg";
import unityicon from "../../assets/img/unity.svg";
import bbvicon from "../../assets/img/bbv.svg";
import viscoseicon from "../../assets/img/Vesco.svg";
import infosysicon from "../../assets/img/infosys.svg";



function LoginFooter() {
    return (
        <>
        <div className="login-footer">
            <h2>Trusted by more than 1000+ Companies</h2>
        </div>
        <div className="login-footer-icon-div">
            <div className="login-footer-icon">
            <img src={dellicon} alt="dellicon" />
            </div>{" "}
            <div className="login-footer-icon">
            <img src={viscoseicon} alt="viscoseicon" />
            </div>
            <div className="login-footer-icon">
            <img src={infosysicon} alt="infosysicon" />
            </div>
            <div className="login-footer-icon">
            <img src={unityicon} alt="unityicon" />
            </div>
            <div className="login-footer-icon">
            <img src={bbvicon} alt="bbvicon" />
            </div>
        </div>
        </>
    );
}

export default LoginFooter;
