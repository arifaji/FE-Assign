import React, { Component } from "react";
import PDF from "react-pdf-js";
import pdfFile from "./output.pdf";

class MyPdfViewer extends Component {
  state = {
    file: pdfFile
  };

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  onDocumentComplete = pages => {
    this.setState({ page: 1, pages });
  };

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  };

  renderPagination = (page, pages) => {
    let previousButton = (
      <button className="btn btn-sm btn-primary" onClick={this.handlePrevious}>
        <i className="fa fa-arrow-left" /> Previous
      </button>
    );
    if (page === 1) {
      previousButton = (
        <button className="btn btn-sm btn-primary disabled" disabled>
          <i className="fa fa-arrow-left" /> Previous
        </button>
      );
    }
    let nextButton = (
      <button className="btn btn-sm btn-primary" onClick={this.handleNext}>
        Next <i className="fa fa-arrow-right" />
      </button>
    );
    if (page === pages) {
      nextButton = (
        <button className="btn btn-sm btn-primary disabled" disabled>
          Next <i className="fa fa-arrow-right" />
        </button>
      );
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  };

  render() {
    const { file } = this.state;
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        {/* <div className="container">
          <label htmlFor="file">Load from file:</label>{" "}
          <input type="file" onChange={this.onFileChange} />
        </div> */}
        {pagination}
        <PDF
          // file="https://core.ac.uk/download/pdf/11724998.pdf"
          file={file}
          onDocumentComplete={this.onDocumentComplete}
          page={this.state.page}
        />
        {pagination}
      </div>
    );
  }
}

export default MyPdfViewer;
