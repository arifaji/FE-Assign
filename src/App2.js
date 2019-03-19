import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom";
import "xml2js";
import fileXml from "./components/cobaparserxml/model.xml";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { output: "", isixml: "nope" };
  }

  componentDidMount() {
    console.log("component did mount");
    var xml2js = require("xml2js");
    var extractedData = "masih kosong wkwk";
    var parser = new xml2js.Parser();

    fetch(fileXml)
      .then(response => response.text())
      .then(response => {
        // console.log(response);
        parser.parseString(response, function(err, result) {
          //Extract the value from the data element
          // console.log(result);

          extractedData = result["root"]["element"];
        });
      })
      .catch(err => {
        console.log("fetch", err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    const file = this.App.files[0];
    console.log(file);
    console.log(fileXml);
    // const file = fileXml;

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onloadend = evt => {
      var xml2js = require("xml2js");
      const readerData = evt.target.result;

      // const parser = new DOMParser();
      // const xml = parser.parseFromString(readerData, "text/xml");

      var extractedData = "";
      const parser = new xml2js.Parser();
      const xml = parser.parseString(readerData, function(err, result) {
        extractedData = result["root"]["element"];
        console.log(extractedData);
      });
      alert(extractedData);

      // const output = xml.querySelector("ST_TIMERANGE").getAttribute("Weeks");
      // const output = xml.querySelector("ST_TIMERANGE").getAttribute("Weeks");

      // this.setState({ output });
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} />
          <h1 className="App-title">Insulog</h1>
        </header>
        <p className="App-intro">
          Please Enter your insulog XML file at the button below
        </p>

        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input
              type="file"
              ref={input => {
                this.App = input;
              }}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>

        <h2>XML Readings of ST_TIMERANGE and WEEKS: {this.state.output}</h2>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
