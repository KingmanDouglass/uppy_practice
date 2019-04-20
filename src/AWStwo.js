import React, { Component } from "react";
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
const AwsS3 = require('@uppy/aws-s3')
const ms = require('ms')
const Uppy = require('@uppy/core')
const Tus = require('@uppy/tus')
const GoogleDrive = require('@uppy/google-drive')
const { Dashboard } = require('@uppy/react')

export default class AWStwo extends Component {
  componentWillMount() {
    this.companionAllowedHosts = "localhost:5000"; //or yoursite.com(where your node code lives and acts as uppy server)

    this.uppy = new Uppy({
      autoProceed: false,
      restrictions: {
        maxFileSize: 10000000, //uppy options
        maxNumberOfFiles: 30,
        minNumberOfFiles: 1,
        allowedFileTypes: false
      },
      onBeforeFileAdded: (currentFile, files) => {
        console.log("i am going to add file to dashboard", currentFile);
      },
      onBeforeUpload: files => {
        console.log("i am going to upload files", files);
      }
    })

      .use(AwsS3, {
        companionAllowedHosts: this.companionAllowedHosts
      })

      .use(GoogleDrive, {
        companionAllowedHosts: this.companionAllowedHosts
      })
      .on("upload", data => {
        console.log("uploading", data);
      })
      .on("file-removed", file => {
        console.log("removing", file);
      })
      .on("complete", result => {
        console.log("failed ", result.failed);
        console.log("failed ", result.successful);
      })
      .on("upload-success", (file, resp, uploadURL) => {
        console.log("upload successful, uploadUrl is", uploadURL);
      })
      .run(); //run uppy
  }
  render() {
    return (
      <div>
        <Dashboard //uppy dashboard component
          uppy={this.uppy}
          plugins={[
           
          ]}
        />
      </div>
    );
  }
}