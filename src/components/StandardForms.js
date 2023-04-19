import React, { Component } from "react";
import styles from "@styles/Home.module.css";

function ValidationMessage(props) {
  if (!props.valid) {
    return (
      <div className="alert-danger" role="alert">
        {" "}
        {props.message}
      </div>
    );
  }
  return null;
}

export class StandardForms extends Component {
  state = {
    username: "",
    usernameValid: false,
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false,
    formValid: false,
    errorMsg: {},
  };

  validateUsername = () => {
    const { username } = this.state;
    let usernameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (username.length < 3 || username.length > 20) {
      usernameValid = false;
      errorMsg.username = "What's your name?";
    }
    this.setState({ usernameValid, errorMsg });
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (/\S+@\S+\.\S+/.test(email)) {
      emailValid = false;
      errorMsg.email = "Email must contain @";
    }
    this.setState({ emailValid, errorMsg });
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = "Password must be at least 6 characters long";
    }
    this.setState({ passwordValid, errorMsg });
  };

  render() {
    return (
      <div className={"styles.hello"}>
        <h1> Sign up </h1>
        <h3> It’s quick and easy. </h3>
        <br></br>

        <form>
          <div className={"styles.form-group"}>
            <label htmlFor="styles.username"></label>
            <input
              type="text"
              id="username"
              value={this.state.username}
              className="form-control"
              placeholder="First name"
              onChange={(e) =>
                this.setState(
                  { username: e.target.value },
                  this.validateUsername
                )
              }
            />

            <label htmlFor="usernames"></label>
            <input
              type="text"
              id="usernames"
              value={this.state.usernames}
              className="form-control"
              placeholder="Last name"
              onChange={(e) =>
                this.setState(
                  { usernames: e.target.value },
                  this.validateUsername
                )
              }
            />
            <span>
              <ValidationMessage
                valid={this.state.usernameValid}
                message={this.state.errorMsg.username}
              />{" "}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              className="form-control"
              placeholder="Mobile number or email"
              onChange={(e) =>
                this.setState({ email: e.target.value }, this.validateEmail)
              }
            />
            <span>
              <ValidationMessage
                valid={this.state.emailValid}
                message={this.state.errorMsg.email}
              />{" "}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              className="form-control"
              placeholder="New password"
              onChange={(e) =>
                this.setState(
                  { password: e.target.value },
                  this.validatePassword
                )
              }
            />
            <span>
              <ValidationMessage
                valid={this.state.passwordValid}
                message={this.state.errorMsg.password}
              />{" "}
            </span>
          </div>

          <div className="form-group">
            <br></br>

            <span>
              <label for="day"></label>
              <select name="day" id="day"></select>
            </span>

            <span>
              <label for="month"></label>
              <select name="month" id="month"></select>
            </span>

            <span>
              <label for="year"></label>
              <select name="year" id="year">
                Year:
              </select>
            </span>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="submit">
              {" "}
              Sign up{" "}
            </button>
          </div>
          <br></br>
          <p>
            Name:{this.state.username} {this.state.usernames}
          </p>
          <p> Email:{this.state.email} </p>
          <p> Password:{this.state.password} </p>
        </form>
      </div>
    );
  }
}

export default StandardForms;
