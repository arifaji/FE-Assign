import React, { Component } from "react";

import DynamicForm from "./ChildForm";
import DynamicTable from "./sort/ChildTable";
import modelFormXML from "./modelForm.xml";
import modelTableXML from "./modelTable.xml";
import Search from "./Search";

class ParentForm extends Component {
  state = {
    dataID: "",
    modelFor: "",
    renderForm: false,
    fetchFormXML: "",
    sendFormXML: "",
    fetchTableXML: "",
    sendTableXML: "",
    title: "",
    direction: {
      name: "asc"
    }
  };

  handleEdit = async model => {
    this.setState({ dataID: model });
    alert("edit with id : " + model);
    //let title = this.state.title;

    const { title } = this.state;

    this.handleSwitch(title, model);
  };

  handleDelete = async dataID => {
    var r = window.confirm("Delete data with ID : " + dataID + " ?");
    if (r === true) {
      alert("Data ID " + dataID + " deleted");
      console.log(dataID);
      let url = "http://10.10.28.173:3000/api/customer/" + dataID + [];

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      })
        // .then(res => res.json())
        // .then(response => {
        //   console.log("Status:", JSON.stringify(response));
        //   if (response.message === "Success") {
        //     alert(response.message);
        //   } else {
        //     alert("Failed");
        //   }
        // })
        .then(window.location.reload());
    } else {
    }
  };

  handleFormUnmount = () => {
    this.setState({ renderForm: false });
  };

  handleFormMount = () => {
    this.setState({ renderForm: true });
  };

  onSort(sortKey) {
    alert("Sort by : " + sortKey);
    const { sendTableXML } = this.state;
    console.log(sendTableXML);
    // this.setState({
    //   sendTableXML: sendTableXML.sort((a, b) =>
    //     this.state.direction[sortKey] === "asc"
    //       ? parseFloat(a[sortKey]) - parseFloat(b[sortKey])
    //       : parseFloat(b[sortKey]) - parseFloat(a[sortKey])
    //   ),
    //   direction: {
    //     [sortKey]: this.state.direction[sortKey] === "asc" ? "desc" : "asc"
    //   }
    // });
  }

  onSubmit = model => {
    alert(JSON.stringify(model));
    console.log(this.state.dataID);
    const { dataID, title, modelFor } = this.state;
    if (typeof this.state.dataID === "object") {
      let url = "http://10.10.18.199:5000/api/customer/" + dataID;

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(model),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(this.handleSwitch(modelFor));
    } else {
      let url = "http://10.10.18.199:5000/api/customer/" + title;

      fetch(url, {
        method: "POST",
        body: JSON.stringify(model),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(this.handleSwitch(modelFor));
    }
  };

  //Component DID MOUNT
  componentDidMount() {
    this.getXML();
  }

  //How to convert XML to JSON then generate become a Dynamic Form
  getXML = async () => {
    let parseXML = require("xml2js");

    //-=> Fetch API / xml untuk Form (modelFormXML) / (newformat) CUSTOMER_FORM
    // let newformat = "http://10.10.18.199:5000/api/Form%20SME/customer";
    await fetch(modelFormXML)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchFormXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchFormXML = this.state.fetchFormXML;
    let sendFormXML;

    try {
      parseXML.parseString(fetchFormXML, function(err, result) {
        sendFormXML = result;
      });
      this.setState({
        sendFormXML
      });
    } catch (err) {
      alert(err.message);
    }

    //-=> Fetch API / xml untuk Form (modelTableXML) / () CUSTOMER_TABLE
    const tableAPI = "http://10.10.18.199:5000/api/SME/List";
    await fetch(modelTableXML)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchTableXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchTableXML = this.state.fetchTableXML;
    let sendTableXML;
    try {
      parseXML.parseString(fetchTableXML, function(err, result) {
        sendTableXML = result;
      });
      this.setState({
        sendTableXML
      });
    } catch (err) {
      alert(err.message);
    }
  };

  handleSwitch = async (model, value) => {
    this.setState({ modelFor: model });
    this.handleFormUnmount();
    let parseXML = require("xml2js");

    //-=> Fetch API / xml untuk Form (modelFormXML) / (newformat) CUSTOMER_FORM
    let newformat = "http://10.10.18.199:5000/api/" + model + "/Form/" + value;
    await fetch(newformat)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchFormXML: response });
      })
      .catch(err => {
        alert("fetch", err);
      });
    let fetchFormXML = this.state.fetchFormXML;
    let sendFormXML;

    try {
      parseXML.parseString(fetchFormXML, function(err, result) {
        sendFormXML = result;
      });
      this.setState({
        sendFormXML
      });
    } catch (err) {
      alert(err.message);
    }

    //-=> Fetch API / xml untuk Form (modelTableXML) / () CUSTOMER_TABLE
    const tableAPI = "http://10.10.18.199:5000/api/" + model + "/List";
    await fetch(tableAPI)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchTableXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchTableXML = this.state.fetchTableXML;
    let sendTableXML;
    try {
      parseXML.parseString(fetchTableXML, function(err, result) {
        sendTableXML = result;
      });
      this.setState({
        sendTableXML
      });
    } catch (err) {
      alert(err.message);
    }
    this.handleFormMount();
    this.setState({
      title: model
    });
  };

  onSearch = async model => {
    this.handleFormUnmount();
    let parseXML = require("xml2js");
    const { modelFor } = this.state;

    //-=> Fetch API / xml untuk Form (modelTableXML) / () CUSTOMER_TABLE
    const searchAPI =
      "http://10.10.18.199:5000/api/search/" + modelFor + "/List/";
    await fetch(searchAPI, {
      method: "POST",
      body: JSON.stringify(model),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchTableXML: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });
    let fetchTableXML = this.state.fetchTableXML;
    let sendTableXML;
    try {
      parseXML.parseString(fetchTableXML, function(err, result) {
        sendTableXML = result;
      });
      this.setState({
        sendTableXML
      });
    } catch (err) {
      alert(err.message);
    }
    this.handleFormMount();
  };

  render() {
    let model = this.state.sendFormXML || [{}];
    let modelTable = this.state.sendTableXML || [{}];
    return (
      <div className="App">
        <div className="row" style={{ margin: 10 }}>
          <div className="col">
            <button
              onClick={() => this.handleSwitch("SME")}
              type="button"
              className="btn btn-lg"
            >
              SME
            </button>
          </div>
          <div className="col">
            <button
              onClick={() => this.handleSwitch("MUR")}
              type="button"
              className="btn btn-lg"
            >
              MUR
            </button>
          </div>
          <div className="col">
            <button
              onClick={() => this.handleSwitch("Commercial")}
              type="button"
              className="btn btn-lg"
            >
              Commercial
            </button>
          </div>
        </div>
        <br />
        {this.state.renderForm && (
          <React.Fragment>
            <Search
              onSearch={model => {
                this.onSearch(model);
              }}
            />
            <br />
            <DynamicTable
              model={modelTable}
              onSort={sortKey => this.onSort(sortKey)}
              handleEdit={model => this.handleEdit(model)}
              handleDelete={model => this.handleDelete(model)}
            />
            <DynamicForm
              model={model}
              className="form"
              title={"Form Customer " + this.state.title}
              onSubmit={model => {
                this.onSubmit(model);
              }}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ParentForm;
