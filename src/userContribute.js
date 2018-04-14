import React, { Component } from "react";
import CustomButton from "./custom-button";
import axios from "axios";
import config from "./config.js";

class UserContribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      url: ""
    };

    this.handleKeyword = this.handleKeyword.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleKeyword(event) {
    this.setState({ keyword: event.target.value });
  }

  handleUrl(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit() {
    let keyword = this.state.keyword;
    let url = this.state.url;
    let keywordArray = keyword.split(",");

    axios
      .post(
        config.baseUrl + "keywords",
        {
          keywords: keywordArray,
          websiteUrl: url
        },
        {
          headers: { "authorization-token": localStorage.getItem("authToken") },
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      )
      .then(function(response) {
        alert("Keyword Added");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="heading">Add Keywords</div>
        <div className="field-container">
          <span className="input-container">
            <input
              type="text"
              spellCheck="false"
              className="url"
              required
              value={this.state.url}
              onChange={this.handleUrl}
              placeholder="URL"
            />
          </span>
          <span className="input-container">
            <input
              type="text"
              spellCheck="false"
              className="keyword"
              required
              value={this.state.keyword}
              onChange={this.handleKeyword}
              placeholder="example - tech, search"
            />
          </span>
          <div onClick={this.handleSubmit} className="submit-btn">
            <CustomButton
              isDisabled={false}
              buttonText="Submit"
              style={{ margin: "0 auto", marginTop: "40px" }}
            />
          </div>
        </div>
        <style jsx>
          {`
            .keyword,
            .url {
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
            .url:focus,
            .keyword:focus {
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
            .heading {
              color: #ffffff;
              font-family: Montserrat;
              font-size: 50px;
              margin: 20px 0 20px 0;
              font-weight: 500;
            }
            .field-container {
              width: 40%;
              margin: 0 auto;
            }
          `}
        </style>
      </div>
    );
  }
}

export default UserContribute;
