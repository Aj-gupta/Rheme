import React, { Component } from "react";
import logo from "./static/rheme-logo.svg";
import illustration from "./static/landing-page-illustration.svg";
import CustomButton from "./custom-button";
import { hashHistory } from "react-router";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCategory: "user",
      mode: "Login",
      modeToggleText: "New User? Sign Up",
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    this.toggleCategory = this.toggleCategory.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleCategory(event) {
    const selectedCategory = event.target.getAttribute("datavalue");
    this.setState({
      toggleCategory: selectedCategory,
      mode: "Login",
      modeToggleText: "New User? Sign Up",
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    });
  }

  toggleMode() {
    if (this.state.modeToggleText === "New User? Sign Up") {
      this.setState({
        modeToggleText: "Existing User? Login",
        mode: "Sign Up",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      });
    } else {
      this.setState({
        mode: "Login",
        modeToggleText: "New User? Sign Up",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      });
    }
  }

  handleFirstName(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  handleLastName(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit() {
    let apiRequestObject = {};
    let fetchUrl;
    const baseURL = "https://cbd19d91.ngrok.io/";

    if (this.state.email === "") {
      alert("Please enter a valid Email");
      return;
    } else if (this.state.password === "") {
      alert("Please enter a valid Password");
      return;
    }

    apiRequestObject.username = this.state.email;
    apiRequestObject.password = this.state.password;

    if (this.state.mode === "Login") {
      if (this.state.toggleCategory === "user") {
        fetchUrl = `${baseURL}user-login`;
      } else {
        fetchUrl = `${baseURL}admin-login`;
      }
    } else {
      if (this.state.toggleCategory === "user") {
        fetchUrl = `${baseURL}user-register`;
        apiRequestObject.firstName = this.state.firstName;
        apiRequestObject.lastName = this.state.lastName;
      } else {
        fetchUrl = `${baseURL}admin-register`;
        apiRequestObject.firstName = this.state.firstName;
        apiRequestObject.lastName = this.state.lastName;
      }
    }
    console.log(
      fetchUrl +
        "?username=" +
        apiRequestObject.email +
        "&password=" +
        apiRequestObject.password
    );
    console.log(apiRequestObject);
    axios
      .post(
        fetchUrl,
        apiRequestObject,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      // .then(response => response.json())
      .then(responseJson => {
        localStorage.setItem("authToken", JSON.parse(responseJson.data).authToken);
        if (this.state.toggleCategory === "user") {
          hashHistory.push("/dashboard-user");
        } else {
          hashHistory.push("/dashboard-admin");
        }
      })
      .catch(error => {
        // console.log(error.response);
        alert(error.response.data.message);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title main-title">RHEME</span>
          <span className="App-title">HOME</span>
          <span className="App-title">ABOUT</span>
          <span className="App-title">EXTENSION</span>
          <span className="App-title">{/* Dummy Data*/}</span>
          <span className="App-title">{/* Dummy Data*/}</span>
        </header>
        <div className="container">
          <div className="left-side">
            <div className="logo-combined">
              <div className="logo-top">
                <img src={logo} alt="Rheme Logo" className="logo" />
                <div className="logo-title">Rheme</div>
              </div>
              <div className="logo-bottom">
                <span className="monitor"> Monitor </span>
                <span className="blip"> ● </span>
                <span className="track"> Track </span>
                <span className="blip"> ● </span>
                <span className="find"> Find </span>
              </div>
            </div>
            <div className="illustration">
              <img
                src={illustration}
                alt="landing-page-illustration"
                className="landing-page-illustration"
              />
            </div>
          </div>
          <div className="right-side">
            <div className="toggle-buttons">
              <button
                datavalue="user"
                onClick={this.toggleCategory}
                className={
                  this.state.toggleCategory === "user"
                    ? "toggle-btn"
                    : "toggle-btn toggle-btn-unselect"
                }
              >
                User
              </button>
              <button
                datavalue="admin"
                onClick={this.toggleCategory}
                className={
                  this.state.toggleCategory === "admin"
                    ? "toggle-btn"
                    : "toggle-btn toggle-btn-unselect"
                }
              >
                Admin
              </button>
            </div>
            <div className="input-fields">
              <span
                className={
                  this.state.mode === "Sign Up"
                    ? "input-container"
                    : "input-container invisible-inputs"
                }
              >
                <input
                  type="text"
                  spellCheck="false"
                  className={
                    this.state.mode === "Sign Up"
                      ? "first-name"
                      : "first-name invisible-inputs"
                  }
                  required
                  value={this.state.firstName}
                  onChange={this.handleFirstName}
                  placeholder="First Name"
                />
              </span>
              <span
                className={
                  this.state.mode === "Sign Up"
                    ? "input-container"
                    : "input-container invisible-inputs"
                }
              >
                <input
                  type="text"
                  spellCheck="false"
                  className={
                    this.state.mode === "Sign Up"
                      ? "last-name"
                      : "last-name invisible-inputs"
                  }
                  required
                  value={this.state.lastName}
                  onChange={this.handleLastName}
                  placeholder="Last Name"
                />
              </span>
              <span className="input-container">
                <input
                  type="text"
                  spellCheck="false"
                  className="email"
                  required
                  value={this.state.email}
                  onChange={this.handleEmail}
                  placeholder="Username"
                />
              </span>
              <span className="input-container">
                <input
                  type="password"
                  spellCheck="false"
                  className="password"
                  required
                  value={this.state.password}
                  onChange={this.handlePassword}
                  placeholder="Password"
                />
              </span>
            </div>
            <div onClick={this.handleSubmit}>
              <CustomButton
                isDisabled={false}
                buttonText={this.state.mode}
                style={{ margin: "0 auto", marginTop: "40px" }}
              />
            </div>
            <button className="mode-toggle-text" onClick={this.toggleMode}>
              {this.state.modeToggleText}
            </button>
          </div>
        </div>
        <style jsx>
          {`
            .App {
              text-align: center;
            }
            .App-header {
              background-color: #201646;
              height: 60px;
              padding: 20px;
              color: white;
              display: flex;
            }
            .App-title {
              padding: 5px;
              font-family: Montserrat;
              font-size: 16px;
              padding-left: 40px;
              padding-right: 40px;
              padding-top: 15px;
              font-weight: 400;
              cursor: pointer;
            }
            .main-title {
              flex: 1;
              padding-right: 25%;
              color: #60b2f0;
            }
            .container {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .logo {
              height: 98px;
            }
            .logo-title {
              font-family: "Varela Round", sans-serif;
              color: #ffffff;
              padding: 15px;
              font-size: 48px;
              line-height: 98px;
            }
            .left-side {
              padding-left: 15%;
            }
            .logo-combined {
              display: flex;
              flex-direction: column;
              max-width: 285px;
              margin: 0 auto;
            }
            .logo-top {
              display: flex;
              flex-direction: row;
            }
            .logo-bottom {
              margin-top: -10px;
              text-align: center;
            }
            .blip {
              color: white;
            }
            .monitor,
            .track,
            .find {
              font-size: 22px;
              font-family: Montserrat;
              font-weight: 600;
            }
            .monitor {
              color: #3efd95;
            }
            .track {
              color: #faeb42;
            }
            .find {
              color: #3a39ff;
            }
            .illustration {
              padding-top: 65px;
            }
            .landing-page-illustration {
              height: 330px;
            }
            .right-side {
              min-width: 45%;
              margin-right: 10%;
            }
            .toggle-btn {
              background: none;
              border: none;
              color: #ffffff;
              font-family: Montserrat;
              font-size: 24px;
              font-weight: 500;
              padding-top: 35px;
              margin-right: 30px;
              margin-left: 30px;
              cursor: pointer;
            }
            .toggle-btn:after {
              border-bottom: solid 2px #ffffff;
              display: block;
              content: "";
              transform: scaleX(1);
              transition: transform 250ms ease-in-out;
            }
            .toggle-btn-unselect {
              opacity: 0.5;
              border-bottom: none;
            }
            .toggle-btn-unselect:after {
              transform: scaleX(0);
            }
            .toggle-btn:focus {
              outline: 0;
            }
            .input-fields {
              margin: 0 auto;
              display: flex;
              flex-direction: column;
              max-width: 58%;
              margin-top: 30px;
            }
            .email,
            .password,
            .first-name,
            .last-name {
              background: none;
              border: none;
              color: #ffffff;
              font-family: Montserrat;
              font-size: 22.5px;
              font-weight: 300;
              margin-top: 40px;
              width: 100%;
              border-bottom: solid 2px #ffffff80;
              box-shadow: none;
            }
            .email:focus,
            .password:focus,
            .first-name:focus,
            .last-name:focus {
              outline: 0;
            }
            .input-container:after {
              border-bottom: solid 2px #ffffff;
              display: block;
              content: "";
              transform: scaleX(0);
              transition: all 500ms ease-in-out;
              margin-top: -2px;
            }
            .input-container:focus-within:after {
              transform: scaleX(1);
              outline: 0;
            }
            .invisible-inputs {
              display: none;
            }
            .mode-toggle-text {
              font-family: Montserrat;
              font-size: 19px;
              background: none;
              border: none;
              color: #459af1;
              font-weight: 500;
              margin-top: 30px;
              cursor: pointer;
            }
            .mode-toggle-text:focus {
              outline: 0;
            }
          `}
        </style>
      </div>
    );
  }
}

export default App;
