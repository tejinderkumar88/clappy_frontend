import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { addUser } from "../../redux/rtk/features/user/userSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginTable from "../Card/LoginTable";
import LoginFooter from "./LoginFooter";
import LoginBanner from "../Banner/LoginBanner";
import googleicon from "../../assets/img/googleicon.svg";
import appleicon from "../../assets/img/appleicon.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { Title } = Typography;

  const onFinish = async (values) => {
    const resp = await dispatch(addUser(values));
    if (resp.payload.message === "success") {
      setLoader(false);
      window.location.href = "/admin/dashboard";
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("Error at login Please try again");
  };

  const isLogged = Boolean(localStorage.getItem("isLogged"));
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <>
      <section className="login-main-section">
        <div className="container">
          <div className="login-parent">
            <div className="login-child login-first-section">
              <LoginBanner />
            </div>
            <div className="login-child login-second-section">
              <div className="login-form-div">
                <div className="login-form-heading">
                  <h2>
                    Login <span className="blue">Clappe Online</span>
                  </h2>
                </div>
                <div className="login-form">
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    onFinishFailed={onFinishFailed}
                  >
                    <div className="login-form-input">
                      <label>Phone Number, Email or User ID</label>
                      <Form.Item
                        className="mb-4"
                        fullWidth
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter username" />
                      </Form.Item>

                      <Form.Item
                        className="mb-2"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input password!",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Enter Password" />
                      </Form.Item>
                    </div>
                    <div className="form-bottom-div">
                      <div className="flex">
                        <input type="checkbox" className="largerCheckbox" />
                        <label className="checkbox-label">
                          Remember me next time
                        </label>
                      </div>
                    </div>
                    <div className="login-form-btn">
                      <button
                        className="password-btn"
                        type="submit"
                        onClick={() => setLoader(true)}
                      >
                        Continue
                      </button>
                    </div>
                    <div className="border-login-form">
                      <div className="login-form-or">OR</div>
                    </div>
                    <div className="login-form-btn-google">
                      <button className="password-btn">
                        <img
                          src={googleicon}
                          alt="googleicon"
                          className="social-icon"
                        />
                        Continue with Google
                      </button>
                    </div>
                    <div className="login-form-btn-apple">
                      <button className="password-btn">
                        <img
                          src={appleicon}
                          alt="appleicon"
                          className="social-icon"
                        />
                        Continue with Apple
                      </button>
                    </div>
                    <div className="login-form-signup">
                      <p>
                        Don&apos;t have an account?{" "}
                        <span className="login-form-signup-span">
                          <a href="/signup">Sign Up</a>
                        </span>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
              <LoginFooter />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
