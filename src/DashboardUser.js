import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

class DashboardUser extends Component {
  render() {
    const options = [
      'John',
      'Miles',
      'Charles',
      'Herbie',
    ];
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
        <div className = "container">
          <form className="search-form">
            <label className="search-heading">
              Search for a Website
            </label>
            <div className="input-container">
              <div className="input-grp">
                <div className="search-bar">
                <Typeahead
                  selectHintOnEnter= {true}
                  highlightOnlyResult= {true}
                  options={options}
                  bsSize="large"
                  placeholder="Search using a Keyword (For e.g. technology, social, etc.)"
                />
                </div>
                {/* <button className="search-button">
                  <span className="search-btn" />
                </button> */}
              </div>
            </div>
          </form>
        </div>
        <style jsx>{`
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
        `}
        </style>
      </div>
    );
  }
}

export default DashboardUser;
