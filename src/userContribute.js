import React, { Component } from "react";
import CustomButton from "./custom-button";
import axios from "axios";

class UserContribute extends Component{
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
		let keywordArray = keyword.split(',');
		const baseURL = "https://cbd19d91.ngrok.io/";
		var authOptions = {
			method: 'POST',
			url: `${baseURL}keywords`,
			data:  {
				keyword: keywordArray,
				url: url
			},
			headers: {
				'Authorization_Token': localStorage.getItem('authToken')
			},
			json: true
		};
		
		axios.post(authOptions)
		.then(function (response) {
			alert("Keyword Added");
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	render(){
		return (
			<div>
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
					<input
						type="text"
						spellCheck="false"
						className="keyword"
						required
						value={this.state.keyword}
						onChange={this.handleKeyword}
						placeholder="example - tech, search"
					/>
					<div onClick={this.handleSubmit}>
              <CustomButton
								isDisabled={false}
								buttonText="Submit"
							/>
            </div>
				</span>
				<style jsx>{`
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
            .keyword:focus{
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

export default UserContribute;