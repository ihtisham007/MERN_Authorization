import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    // Send the file to the API endpoint
    axios.post('/api/v1/users/file', formData)
      .then((response) => {
        console.log(response.data);
        // Handle the response from the API
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the file upload
      });
  };

  handleGenerateFile = () => {
    // Call the API endpoint to generate the file
    axios.get('/api/v1/users/fileenerate')
      .then((response) => {
        console.log(response.data);
        // Handle the response from the API
        document.querySelector('.downloadFile').setAttribute('href', `http://127.0.0.1:5000/uploads/${response.data.link}`);
        document.querySelector('.downloadFile').click();  
        debugger;
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the API call
      });
  };

  render() {
    return (
      <div className="container">
        <h1>Upload and Generate File</h1>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">Choose a file:</label>
          <input className="form-control" type="file" id="fileInput" onChange={this.handleFileUpload} />
        </div>
        <a href='' className='downloadFile' />
        <button className="btn btn-primary" onClick={this.handleGenerateFile}>Generate File</button>
      </div>
    );
  }
}
