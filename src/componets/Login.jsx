import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Card from "react-bootstrap/Card";
import User from "../assets/img/Login.jpg";
import "./Sign.css";
import Spinner from "react-bootstrap/Spinner";
import AuthService from "../services/AuthService";
import {
  NavLink,
  useNavigate,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import md5 from "md5";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const validUserEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid UserEmail.
      </div>
    );
  }
};

const vUserPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The UserPassword must be between 6 and 40 characters.
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const currentUser = AuthService.getCurrentUser();
  if (currentUser) {
    return <Navigate to="/home" />;
  }

  const onChangeUserEmail = (e) => {
    const UserEmail = e.target.value;
    setUserEmail(UserEmail);
  };

  const onChangeUserPassword = (e) => {
    const UserPassword = e.target.value;
    setUserPassword(UserPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(UserEmail, UserPassword).then(
        (response) => {
          setSuccessful(true);

          setMessage("Login successful!");
          setTimeout(function () {
            navigate(`/home?user_email=${md5(UserEmail)}`);
          }, 2000);
        },
        (error) => {
          setMessage("An error occurred when signing in!");
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <>
      <Card
        className="mt-5 shadow"
        style={{
          align: "center",
          margin: "auto",
          width: "30%",
          padding: "10px",
        }}
      >
        <Card.Img
          style={{
            align: "center",
            margin: "auto",
            width: "50%",
          }}
          variant="top"
          src={User}
        />
        <Card.Body>
          <Card.Text>
            <Form onSubmit={handleLogin} ref={form}>
              {!successful && (
                <div>
                  <hr />

                  <div className="form-group">
                    <Input
                      placeholder={
                        searchParams.get("user_email")
                          ? searchParams.get("user_email")
                          : "Email Address"
                      }
                      type="email"
                      className="form-control"
                      name="UserEmail"
                      value={UserEmail}
                      onChange={onChangeUserEmail}
                      validations={[required, validUserEmail]}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <Input
                      placeholder="Password"
                      id="Pass"
                      type="password"
                      className="form-control"
                      name="UserPassword"
                      value={UserPassword}
                      onChange={onChangeUserPassword}
                      validations={[required, vUserPassword]}
                    />
                  </div>

                  <br />
                  <div className="form-group">
                    <div className="d-grid gap-2">
                      <button className="btn btn-success btn-block btn-sm">
                        Sign In
                      </button>
                    </div>
                  </div>

                  <div className="form-group mt-1">
                    <div className="d-grid gap-2">
                      <NavLink className="d-grid gap-2" to="/sign-up">
                        <button className="btn btn-primary btn-block btn-sm">
                          Sign Up
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
              <br />
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}

                    <div
                      style={
                        successful ? { display: "block" } : { display: "none" }
                      }
                    >
                      <br />
                      <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                      ></Spinner>
                      &nbsp; Logging in. Please wait
                    </div>
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
