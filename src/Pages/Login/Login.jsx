import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Actions/authActions.js";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Input } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Redirect to dashboard if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (credentials) => {
    dispatch(login(credentials));
  };

  if (isAuthenticated) navigate("/dashboard");

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <span className="c-heading size-2 bold mb-2 text-center">Login</span>
        <Form name="basic" onFinish={handleSubmit} autoComplete="off">
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">User Name</span>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter User name" />
            </Form.Item>
          </div>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">Password</span>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Enter Password" />
            </Form.Item>
          </div>
          <div className="mb-2">
            {error && <Alert type="error" message={error} banner />}
          </div>
          <div className="text-center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
