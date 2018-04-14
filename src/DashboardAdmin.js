import React, { Component } from "react";
import { hashHistory } from "react-router";
import CustomButton from "./custom-button";
import config from "./config.js";
import axios from "axios";

function Sublist({
  baseUrl,
  totalHits,
  usageHours,
  noOfVisitors,
  lastVisited
}) {
  return (
    <div className="track-subdetails">
      <div className="sub-url">{baseUrl}</div>
      <div className="sub-detail">
        <div className="sub-details-section-1">
          <div>
            <span className="sub-details-headings">
              No of Hits:&nbsp;&nbsp;
            </span>
            <span className="sub-details-value">{totalHits}</span>
          </div>
          <div>
            <span className="sub-details-headings">
              No of Visitors:&nbsp;&nbsp;
            </span>
            <span className="sub-details-value">{noOfVisitors}</span>
          </div>
        </div>
        <div className="sub-details-section-2">
          <span className="sub-details-headings">
            Total No of Usage Hours:&nbsp;&nbsp;
          </span>
          <span className="sub-details-value">{usageHours}</span>
        </div>
      </div>
      <style jsx>
        {`
          .track-subdetails {
            min-height: 70px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .sub-url {
            width: 50%;
            text-align: left;
            font-size: 20px;
            line-height: 60px;
          }
          .sub-detail {
            width: 30%;
            display: flex;
            flex-direction: column;
            vertical-align: middle;
            margin: auto 0;
            text-align: right;
          }
          .sub-details-section-1 {
            display: flex;
            flex-direction: row;
            justify-content: end;
            margin: 5px 0;
          }
          .sub-details-section-1 div {
            margin: 0 10px;
          }
          .sub-details-section-2 {
            margin: 5px 0;
            margin-right: 10px;
          }
          .sub-details-headings {
            color: #60b2f0;
            font-weight: 600;
          }
        `}
      </style>
    </div>
  );
}

function handleShowDetails(event) {
  const caret = event.target;
  const number = caret.dataset.value;
  // console.log(number);
  const listOfDivs = document.getElementsByClassName("sub-details");
  // console.log(listOfDivs);
  var selectedDiv;
  for (let i = 0; i < listOfDivs.length; i++) {
    if (listOfDivs[i].dataset.value === number) {
      selectedDiv = listOfDivs[i];
    }
  }
  // console.log(selectedDiv);
  if (selectedDiv.classList.contains("sub-details-show")) {
    selectedDiv.classList.remove("sub-details-show");
    caret.classList.remove("caret-rotate");
  } else {
    selectedDiv.classList.add("sub-details-show");
    caret.classList.add("caret-rotate");
  }
}

function Website({
  baseUrl,
  totalHits,
  usageHours,
  noOfVisitors,
  details,
  index
}) {
  const subDetails = details.map(website => {
    return (
      <Sublist
        baseUrl={website.url}
        totalHits={website.no_of_hits}
        usageHours={website.total_usage_hours}
        noOfVisitors={website.no_of_visitors}
        lastVisited={website.last_visited}
      />
    );
  });
  return (
    <div>
      <div className="track-web">
        <div
          className="custom-caret"
          onClick={handleShowDetails}
          data-value={index}
        >
          ▼
        </div>
        <div className="url">{baseUrl}</div>
        <div className="details">
          <div className="details-section-1">
            <div>
              <span className="details-headings">No of Hits:&nbsp;&nbsp;</span>
              <span className="details-value">{totalHits}</span>
            </div>
            <div>
              <span className="details-headings">
                No of Visitors:&nbsp;&nbsp;
              </span>
              <span className="details-value">{noOfVisitors}</span>
            </div>
          </div>
          <div className="details-section-2">
            <span className="details-headings">
              Total No of Usage Hours:&nbsp;&nbsp;
            </span>
            <span className="details-value">{usageHours}</span>
          </div>
        </div>
      </div>
      <div data-value={index} className="sub-details">
        {subDetails}
      </div>
      <style jsx>
        {`
          .track-web {
            min-height: 70px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .custom-caret {
            width: 60px;
            margin: auto 0;
            font-size: 20px;
            padding-left: 25px;
            padding-bottom: 5px;
          }
          .url {
            width: 50%;
            text-align: left;
            font-size: 20px;
            line-height: 60px;
          }
          .details {
            width: 30%;
            display: flex;
            flex-direction: column;
            vertical-align: middle;
            margin: auto 0;
            text-align: right;
          }
          .details-section-1 {
            display: flex;
            flex-direction: row;
            justify-content: end;
            margin: 5px 0;
          }
          .details-section-1 div {
            margin: 0 10px;
          }
          .details-section-2 {
            margin: 5px 0;
            margin-right: 10px;
          }
          .details-headings {
            color: #60b2f0;
            font-weight: 600;
          }
          .sub-details {
            background: #ffffff;
            color: #201646;
            display: none;
          }
          .sub-details-show {
            display: block;
          }
          .caret-rotate {
            transform: rotate(180deg);
            padding-right: 25px;
            padding-left: 0;
          }
        `}
      </style>
    </div>
  );
}

class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
      websiteDetails: [],
      showAddField: false,
      addWebsite: ""
    };

    this.showAddField = this.showAddField.bind(this);
    this.handleAddWebsite = this.handleAddWebsite.bind(this);
    this.addWebsite = this.addWebsite.bind(this);
  }

  componentWillMount() {
    const authToken = localStorage.getItem("authToken");
    this.setState({
      authToken
    });
    let websiteDetails = [];
    const self = this;
    fetch(config.baseUrl + "admin/websites", {
      method: "get",
      headers: { "authorization-token": localStorage.getItem("authToken") },
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
      .then(response => response.json())
      .then(responseJson => {
        websiteDetails = responseJson;
        self.setState({
          websiteDetails: websiteDetails
        });
      });
    // this.setState({
    //   websiteDetails: websiteDetails
    // });
  }

  showAddField() {
    this.setState({ showAddField: !this.state.showAddField });
  }

  addWebsite(event) {
    if (event.keyCode === 13) {
      // console.log(event.target.value);
      // let domains = [];
      // console.log("fucking beginnning", this);
      const self = this;
      axios
        .post(
          config.baseUrl + "admin/websites",
          {
            websiteUrl: event.target.value
          },
          {
            headers: {
              "authorization-token": localStorage.getItem("authToken")
            }
          }
        )
        .then(function(response) {
          // let self = self;
          let websiteDetails = [];
          fetch(config.baseUrl + "admin/websites", {
            method: "get",
            headers: {
              "authorization-token": localStorage.getItem("authToken")
            },
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          })
            .then(response => response.json())
            .then(responseJson => {
              websiteDetails = responseJson;
              // console.log("WebsiteDetails", websiteDetails, "self", this);
              self.setState({
                websiteDetails: websiteDetails
              });
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  handleAddWebsite(event) {
    this.setState({
      addWebsite: event.target.value
    });
  }

  handleLogout() {
    localStorage.setItem("authToken", "");
    hashHistory.push("/app");
  }

  render() {
    let i = 0;
    const trackList = this.state.websiteDetails.map(website => {
      i++;
      return (
        <Website
          baseUrl={website.baseUrl}
          totalHits={website.totalHits}
          usageHours={website.total_usage_hours}
          noOfVisitors={website.no_of_visitors}
          details={website.details}
          index={i}
        />
      );
    });
    return (
      <div className="dashboard">
        <header className="header">
          <span className="title main-title">RHEME</span>
          <span className="title">TRACK</span>
          <span className="title" onClick={this.handleLogout}>
            LOGOUT
          </span>
          <span className="title">{/* Dummy Data*/}</span>
          <span className="title">{/* Dummy Data*/}</span>
          <span className="title">{/* Dummy Data*/}</span>
        </header>
        <div className="heading-container">
          <div className="container-header">Tracked Websites :</div>
          <div onClick={this.showAddField}>
            <CustomButton isDisabled={false} buttonText="Add +" />
          </div>
        </div>
        {this.state.showAddField ? (
          <div onKeyPress={this.addWebsite}>
            <input
              type="text"
              spellCheck="false"
              className="search-bar"
              required
              value={this.state.addWebsite}
              onChange={this.handleAddWebsite}
              onKeyDown={this.addWebsite}
              placeholder="Website URL"
            />
          </div>
        ) : (
          <div />
        )}
        <div className="tracklist-container">{trackList}</div>
        <style jsx>
          {`
            .dashboard {
              text-align: center;
            }
            .header {
              background-color: #201646;
              height: 60px;
              padding: 20px;
              color: white;
              display: flex;
            }
            .title {
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
            .heading-container {
              display: flex;
              flex-direction: row;
              font-size: 30px;
              font-family: Montserrat;
              color: white;
              width: 75%;
              margin: 0 auto;
              margin-top: 70px;
              justify-content: space-between;
            }
            .container-header {
              text-align: left;
            }
            .tracklist-container {
              width: 75%;
              margin: 0 auto;
              margin-top: 20px;
              font-family: Montserrat;
              color: white;
            }
            .tracklist-container .track-web:nth-child(4n) {
              background: #312752;
            }
            .tracklist-container .track-web:nth-child(4n + 1) {
              background: #211b35cc;
            }
            .search-bar {
              width: 65%;
              height: 40px;
              border-radius: 10px;
              border: none;
              padding: 5px;
              font-family: Montserrat;
              font-weight: 600;
              padding-left: 15px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DashboardAdmin;
