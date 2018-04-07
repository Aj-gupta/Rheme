import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

function Website({ url, hours, hits }) {
  return (
    <div className="website-details">
      <div className="website-detail">{url}</div>
      <div className="website-detail">{hours}</div>
      <div className="website-detail">{hits}</div>
      <style jsx>{`
        .website-details {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .website-details div:first-child {
          text-align: left !important;
        }
        .website-detail {
          box-sizing: border-box;
          flex-grow: 1;
          width: 100%;
          text-align: center;
        }
      `}
      </style>
    </div>
  );
}

class DashboardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      domains: [
        { url: "himank-goel.github.io", hours: 45, hits: 10 },
        { url: "gesture.gecho.tech", hours: 10, hits: 3 },
        { url: "facebook.com", hours: 97, hits: 25 },
        { url: "google.com", hours: 104, hits: 50 }
      ]
    };

    this.handleKeyword = this.handleKeyword.bind(this);
    this.retrieveWebsites = this.retrieveWebsites.bind(this);
  }

  handleKeyword(value) {
    this.setState({ keyword: value[0] });
  }

  retrieveWebsites(event) {
    if (event.keyCode === 13) {
      console.log("retirvieng websites");
    }
  }

  render() {
    const options = ["John", "Miles", "Charles", "Herbie"];
    const websitesList = this.state.domains.map(website => {
      return (
        <Website
          url={website.url}
          hours={website.hours}
          hits={website.hits}
        />
      );
    });
    return (
      <div className="dashboard">
        <header className="header">
          <span className="title main-title">RHEME</span>
          <span className="title">FIND</span>
          <span className="title">CONTRIBUTE</span>
          <span className="title">{/* Dummy Data*/}</span>
          <span className="title">{/* Dummy Data*/}</span>
          <span className="title">{/* Dummy Data*/}</span>
        </header>
        <div className="container">
          <form className="search-form">
            <label className="search-heading">Search for a Website</label>
            <div className="input-container">
              <div className="input-grp">
                <div className="search-bar">
                  <Typeahead
                    selectHintOnEnter={true}
                    highlightOnlyResult={true}
                    options={options}
                    bsSize="large"
                    placeholder="Search using a Keyword (For e.g. technology, social, etc.)"
                    onChange={this.handleKeyword}
                    onKeyDown={this.retrieveWebsites}
                  />
                </div>
                {/* <button className="search-button">
                  <span className="search-btn" />
                </button> */}
              </div>
            </div>
          </form>
          <div className="website-container">
            <div className="website-headers">
              <div className="website-header">URL</div>
              <div className="website-header">Number of Hours</div>
              <div className="website-header">Number of Hits</div>
            </div>
            <div className="websites-list">{websitesList}</div>
          </div>
        </div>
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
            .search-form {
              display: flex;
              flex-direction: column;
            }
            .search-heading {
              color: #ffffff;
              font-family: Montserrat;
              font-size: 50px;
              margin: 20px 0 20px 0;
              font-weight: 500;
            }
            .search-bar {
              width: 100%;
              height: 40px;
              border-radius: 10px;
              border: none;
              padding: 5px;
              font-family: Montserrat;
              font-weight: 600;
              padding-left: 15px;
              border-bottom-right-radius: 0;
              border-top-right-radius: 0;
            }
            .input-grp {
              display: flex;
            }
            .search-btn:before {
              content: "\\26B2";
              -webkit-transform: rotate(45deg);
              -moz-transform: rotate(45deg);
              -o-transform: rotate(45deg);
              transform: rotate(45deg);
              display: inline-block;
              font-size: 200%;
            }
            .input-container {
              width: 70%;
              margin: 0 auto;
            }
            .search-button {
              border: none;
              border-radius: 10px;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              width: 6%;
            }
            .websites-list {
              color: white;
              font-family: Montserrat;
              font-size: 22px;
              text-align: left;
            }
            .website-container {
              margin-top: 60px;
              display: flex;
              flex-direction: column;
            }
            .website-headers {
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              color: #60b2f0;
              font-family: Montserrat;
              font-weight: 600;
              font-size: 23px;
            }
            .website-headers div:first-child {
              border-top-left-radius: 17px;
            }
            .website-headers div:nth-child(3) {
              border-top-right-radius: 17px;
            } 
            .website-header {
              border: 2px solid #60b2f0;
              box-sizing: border-box;
              flex-grow: 1;
              width: 100%;
              background: white;
              padding: 0.8em 1.2em;
            }
          `}
        </style>
      </div>
    );
  }
}

export default DashboardUser;
