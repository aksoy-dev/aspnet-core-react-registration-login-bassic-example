import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Card from "react-bootstrap/Card";
import Login from "../assets/img/Login.jpg";
import "./Sign.css";
import Spinner from "react-bootstrap/Spinner";
import AuthService from "../services/AuthService";
import { NavLink, useNavigate, Navigate } from "react-router-dom";

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

const vUserFullName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The UserFullName must be between 3 and 20 characters.
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

const rePassword = (value) => {
  var Pass = document.getElementById("Pass").value;
  // console.log("Pass "+ Pass)
  console.log("RePass " + value);
  if (value !== Pass) {
    console.log("Aynı degil");
    return (
      <div className="invalid-feedback d-block">
        "Your password and confirmation password do not match.
      </div>
    );
  }
};

const DateOfJoin = (today) => {
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = mm + "-" + dd + "-" + yyyy;

  return formattedToday;
};
const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const [UserFullName, setUserFullName] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const UserProfile = Math.floor(Math.random() * 100);
  const DOJ = DateOfJoin(new Date());

  const currentUser = AuthService.getCurrentUser();
  if (currentUser) {
    return <Navigate to="/home" />;
  }

  const onChangeUserFullName = (e) => {
    const UserFullName = e.target.value;
    setUserFullName(UserFullName);
  };

  const onChangeUserEmail = (e) => {
    const UserEmail = e.target.value;
    setUserEmail(UserEmail);
  };

  const onChangeUserPassword = (e) => {
    const UserPassword = e.target.value;
    setUserPassword(UserPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        UserFullName,
        DOJ,
        UserEmail,
        UserProfile,
        UserPassword
      ).then(
        (response) => {
          setMessage("Registration Success");
          setSuccessful(true);
          setTimeout(function () {
            navigate(`/sign-in?user_email=${UserEmail}`);
          }, 2000);
        },

        (error) => {
          setMessage("Error");
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
          src={Login}
        />
        <Card.Body>
          <Card.Text>
            <Form onSubmit={handleRegister} ref={form}>
              {!successful && (
                <div>
                  <hr />
                  <div className="form-group">
                    <Input
                      placeholder="Full Name"
                      type="text"
                      className="form-control"
                      name="UserFullName"
                      value={UserFullName}
                      onChange={onChangeUserFullName}
                      validations={[required, vUserFullName]}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <Input
                      placeholder="Email"
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
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      className="form-control"
                      name="rePassword"
                      validations={[required, rePassword]}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <div className="d-grid gap-2">
                      <button className="btn btn-success btn-block btn-sm">
                        Sign Up
                      </button>
                    </div>
                  </div>

                  <div className="form-group mt-1">
                    <div className="d-grid gap-2">
                      <NavLink className="d-grid gap-2" to="/sign-in">
                        <button className="btn btn-primary btn-block btn-sm">
                          Sign In
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
                      &nbsp; Redirecting
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

export default Register;
