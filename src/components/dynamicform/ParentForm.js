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
      {
        key: "gender",
        label: "Gender",
        type: "radio",
        options: [
          { key: "male", label: "Male", name: "gender", value: "male" },
          { key: "female", label: "Female", name: "gender", value: "female" }
        ]
      },
      { key: "qualification", label: "Qualification" },
      {
        key: "city",
        label: "City",
        type: "select",
        value: "Kerala",
        options: [
          { key: "mumbai", label: "Mumbai", value: "Mumbai" },
          { key: "bangalore", label: "Bangalore", value: "Bangalore" },
          { key: "kerala", label: "Kerala", value: "Kerala" }
        ]
      },
      {
        key: "skills",
        label: "Skills",
        type: "checkbox",
        options: [
          { key: "reactjs", label: "ReactJS", value: "reactjs" },
          { key: "angular", label: "Angular", value: "angular" },
          { key: "vuejs", label: "VueJS", value: "vuejs" }
        ]
      }
    ],
    isixml: "",
    parsexml: ""
  };

  componentDidMount() {
    this.getXML();
  }

  getXML = async () => {
    var xml2js = require("xml2js");
    var url = "http://10.10.18.199:3000/?tableName=form";

    await fetch(fileXml)
      .then(response => response.text())
      .then(response => {
        console.log(response);
        this.setState({ isixml: response });
      })
      .then(() => {
        console.log("done");
      })
      .catch(err => {
        console.log("fetch", err);
      });

    var xml = this.state.isixml;

    console.log(this.state.isixml);

    var extractedData;
    var parser = new xml2js.Parser();
    parser.parseString(xml, function(err, result) {
      //Extract the value from the data element
      console.log(result);
      extractedData = result["elements"]["element"];
      console.log(extractedData);
    });
    // console.log(extractedData);
    this.setState({ parsexml: extractedData });
    console.log(this.state.parsexml);
    console.log(this.state.modele);
  };

  onSubmit2 = model => {
    // model.id = +new Date();
    alert(JSON.stringify(model));
    this.setState({
      data: [model, ...this.state.data]
    });
  };

  onSubmit = model => {
    var url = "http://10.10.18.199:3000/?tableName=customer";
    // alert(JSON.stringify(model));

    fetch(url, {
      method: "POST",
      body: JSON.stringify(model),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log("Status:", JSON.stringify(response));
        if (response.message == "Success") {
          alert(response.message);
        } else {
          alert("Failed");
        }
      });
  };

  render() {
    var xmlmodel = this.state.parsexml || [{ key: "", label: "" }];
    return (
      <React.Fragment>
        <div>{console.log("hello")}</div>

        <DynamicForm
          title="Registration"
          model={xmlmodel}
          // model={this.state.modele}
          onSubmit={model => {
            this.onSubmit2(model);
          }}
        />
      </React.Fragment>
    );
  }
}

export default ParentForm;
