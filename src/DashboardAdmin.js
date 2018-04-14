import React, { Component } from "react";
import { hashHistory } from "react-router";

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
  if(selectedDiv.classList.contains("sub-details-show")) {
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
      websiteDetails: []
    };
  }

  componentWillMount() {
    const authToken = localStorage.getItem("authToken");
    this.setState({
      authToken
    });
    const dummyData = [];
    dummyData.push({
      baseUrl: "www.google.com",
      totalHits: 75,
      total_usage_hours: 78,
      no_of_visitors: 12,
      details: [
        {
          url: "www.google.com/abcd",
          no_of_hits: 75,
          total_usage_hours: 78,
          no_of_visitors: 12,
          last_visited: "23 11 2018 T 23:43"
        },
        {
          url: "www.google.com/bcde",
          no_of_hits: 75,
          total_usage_hours: 78,
          no_of_visitors: 12,
          last_visited: "23 11 2018 T 23:43"
        }
      ]
    });
    dummyData.push({
      baseUrl: "www.facebook.com",
      totalHits: 75,
      total_usage_hours: 78,
      no_of_visitors: 12,
      details: [
        {
          url: "www.facebook.com/abcd",
          no_of_hits: 75,
          total_usage_hours: 78,
          no_of_visitors: 12,
          last_visited: "23 11 2018 T 23:43"
        },
        {
          url: "www.facebook.com/bcde",
          no_of_hits: 75,
          total_usage_hours: 78,
          no_of_visitors: 12,
          last_visited: "23 11 2018 T 23:43"
        }
      ]
    });
    dummyData.push({
      baseUrl: "www.google.com",
      totalHits: 75,
      total_usage_hours: 78,
      no_of_visitors: 12,
      details: [
        {
          url: "www.google.com/abcd",
          no_of_hits: 75,
          total_usage_hours: 78,
          no_of_visitors: 12,
          last_visited: "23 11 2018 T 23:43"
        },
        {
          url: "www.google.com/bcde",
          no_of_hits: 75,
          total_usage_hours: 78,
          no_of_visitors: 12,
          last_visited: "23 11 2018 T 23:43"
        }
      ]
    });
    this.setState({
      websiteDetails: dummyData
    });
    const baseURL = "http://de6a57c7.ngrok.io/";
    let fetchUrl;

    fetch(fetchUrl, {
      method: "post",
      headers: {}
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 201) {
          console.log("Yay");
          const websiteDetails = [];
          this.setState({
            websiteDetails
          });
        } else {
          console.log("Nooo");
        }
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
          <span className="title" onClick={this.handleLogout}>LOGOUT</span>
          <span className="title">{/* Dummy Data*/}</span>
          <span className="title">{/* Dummy Data*/}</span>
          <span className="title">{/* Dummy Data*/}</span>
        </header>
        <div className="container-header">Tracked Websites :</div>
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
            .container-header {
              font-size: 30px;
              font-family: Montserrat;
              color: white;
              width: 75%;
              margin: 0 auto;
              text-align: left;
              margin-top: 70px;
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
            .tracklist-container .track-web:nth-child(4n+1) {
              background: #211b35cc;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DashboardAdmin;
