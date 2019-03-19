import React, { Component } from "react";
import DynamicForm from "./ChildForm";
import fileXml from "../cobaparserxml/model.xml";

class ParentForm extends Component {
  state = {
    data: [
      { id: 1, name: "a", age: 29, qualification: "S.Kom", rating: 3 },
      { id: 2, name: "b", age: 28, qualification: "ST", rating: 4 },
      { id: 3, name: "c", age: 30, qualification: "A.Md", rating: 5 }
    ],
    modele: [
      { key: "name", label: "Name", props: { required: true } },
      { key: "age", label: "Age", type: "number" },
      {
        key: "rating",
        label: "Rating",
        type: "number",
        props: { min: 0, max: 5 }
      },
      { key: "qualification", label: "Qualification" }
    ]
  };

  onSubmit = model => {
    model.id = +new Date();
    alert(JSON.stringify(model));
    this.setState({
      data: [model, ...this.state.data]
    });
  };

  render() {
    var xml2js = require("xml2js");
    var xml2 = { fileXml };
    var xml = `<?xml version="1.0" encoding="UTF-8"?>
    <root>
       <element>
          <key>name</key>
          <label>Name</label>
          <props>
             <required>true</required>
          </props>
       </element>
       <element>
          <key>age</key>
          <label>Age</label>
          <type>number</type>
       </element>
       <element>
          <key>rating</key>
          <label>Rating</label>
          <props>
             <max>5</max>
             <min>0</min>
          </props>
          <type>number</type>
       </element>
       <element>
          <key>qualification</key>
          <label>Qualification</label>
       </element>       
    </root>`;

    var extractedData = "";
    var parser = new xml2js.Parser();
    parser.parseString(xml, function(err, result) {
      //Extract the value from the data element
      extractedData = result["root"]["element"];
    });
    console.log(extractedData);
    console.log(this.state.modele);
    return (
      <React.Fragment>
        <div>{console.log("hello")}</div>
        <DynamicForm
          title="Registration"
          model={extractedData}
          // model={this.state.modele}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />
        <pre>{JSON.stringify(this.state.data)}</pre>
      </React.Fragment>
    );
  }
}

export default ParentForm;
