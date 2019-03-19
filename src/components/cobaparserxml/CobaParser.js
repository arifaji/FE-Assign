import React, { Component } from "react";
import "xml2js";

class CobaParser extends Component {
  state = {
    model: []
  };
  render() {
    var xml2js = require("xml2js");
    var xml = "<config><test>Hello</test><data>SomeData</data></config>";

    var extractedData = "";
    var parser = new xml2js.Parser();
    parser.parseString(xml, function(err, result) {
      //Extract the value from the data element
      extractedData = result["config"];
      console.log(extractedData);
    });

    return <div>hello world</div>;
  }
}

export default CobaParser;
