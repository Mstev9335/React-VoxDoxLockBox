import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import "./Form.css";

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeProjTitle = this.onChangeProjTitle.bind(this);
    this.onChangeProjDescription = this.onChangeProjDescription.bind(this);
    this.onChangeProjUrl = this.onChangeProjUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      proj_title: '',
      proj_description: '',
      proj_url: '',
      selectedFile: null
    }
  }
// ---------------my functions--------------
  // get file
  onChangeHandler = event => {
    // console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

  }
  // upload
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    // console.log("file: " + data.name);
    axios.post("http://localhost:2112/projs/add", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }
// -----------------------------------------------


  // methods

  // -------------
  onChangeProjTitle(e) {
    this.setState({
      proj_title: e.target.value
    });
  }

  onChangeProjDescription(e) {
    this.setState({
      proj_description: e.target.value
    });
  }

  onChangeProjUrl(e) {
    this.setState({
      proj_url: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('form submitted');
    console.log(`Title: ${this.state.proj_title}`);
    console.log(`Description: ${this.state.proj_description}`);
    console.log(`URL: ${this.state.proj_url}`);

    const newProj = {
      proj_title: this.state.proj_title,
      proj_description: this.state.proj_description,
      proj_url: this.state.proj_url
    };

    axios.post('http://localhost:2112/projs/add', newProj)
      .then(res => console.log(res.data));

    this.setState({
      proj_title: '',
      proj_description: '',
      proj_url: '',
    })
  }

  render() {
    return (
      <div className="uploadForm">
        <form onSubmit={this.onSubmit} >
          <div className="row">
            <h2>Upload Form</h2>
          </div>

          <div className="row">
            <label>
              <h3>title</h3>
            </label>
            <input type="text"
              name="title"
              value={this.state.proj_title}
              onChange={this.onChangeProjTitle}
            />
          </div>
          <div className="row">
            <label>
              <h3>description</h3>
            </label>
            <input type="text"
              name="description"
              value={this.state.proj_description}
              onChange={this.onChangeProjDescription}
            />

          </div>
          <hr />
          <div className="row" id="fileUpload">
            <br />
            <input type="file" name="myFile" className="fileInput" onChange={this.onChangeHandler} />
            <button className="submitBtn" type="submit" value="Create Project" onClick={this.onClickHandler}>Create</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Form;
