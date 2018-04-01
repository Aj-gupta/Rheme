import React from "react";
import leftWhite from "./static/left-white.png";
import rightWhite from "./static/right-white.png";

class CustomButton extends React.Component {
  render() {
    return (
      <div>
        <button
          disabled={this.props.isDisabled}
          className="btn custom-btn"
          type="submit"
          style={this.props.style}
        >
          {this.props.buttonText}
        </button>
        <style jsx>
          {`
            .custom-btn {
              box-shadow: none;
              height: 39px;
              margin-top: 6px;
              cursor: pointer;
              display: flex;
              align-items: center;
              line-height: normal;
              text-decoration: none;
              text-align: center;
              border: 0;
              font-size: 0.8em;
              font-family: Montserrat;
              padding: 0;
              color: #201646;
              transition: 0.3s background-color ease-in-out;
              -webkit-font-smoothing: antialiased;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              margin: 10px 0;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-weight: 600;
              position: relative;
              margin-left: 19px;
              background-color: #ffffff;
              background-repeat: no-repeat !important;
            }
            .custom-btn:focus {
                outline: 0;
            }
            .custom-btn:before {
              content: " ";
              background-image: url(${leftWhite});
              background-repeat: no-repeat;
              background-size: contain;
              display: block;
              height: 39px;
              width: 20px;
              position: absolute;
              left: -14px;
              top: 0px;
              z-index: -1;
            }
            .custom-btn:after {
              content: " ";
              background-image: url(${rightWhite});
              background-repeat: no-repeat;
              background-size: contain;
              display: block;
              height: 39px;
              width: 20px;
              position: absolute;
              right: -17px;
              z-index: -1;
              top: 0px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default CustomButton;
